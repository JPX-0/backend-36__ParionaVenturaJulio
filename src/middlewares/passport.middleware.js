import passport from "passport";
import bcrypt from "bcrypt";
import { Strategy as LocalStrategy } from "passport-local";

import UsersDao from "../../models/daos/Users.dao.js";
import CartsDao from "../../models/daos/Cart.dao.js";
const userDao = new UsersDao();
const cartsDao = new CartsDao();

import { createFormat } from "../../utils/formatter/time.format.js";
import renderMail from "../../utils/config/mail.config.js";
import sendMail from "../../utils/config/nodemailer.config.js";
import { consoleLogger, infoLogger } from "../../utils/config/logger.config.js";

const salt = async () => await bcrypt.genSalt(10);
const createHash = async (password) => await bcrypt.hash(password, await salt());
const isValidPassowrd = async (user, password) => await bcrypt.compare(password, user.password);

const dataLocation = [
  { code: "(+51)", prefix: "pe", country: "Perú" },
  { code: "(+54)", prefix: "arg", country: "Argentina" },
  { code: "(+34)", prefix: "esp", country: "España" },
  { code: "(+57)", prefix: "co", country: "Colombia" }
];

// Passport Local Strategy
passport.use("login", new LocalStrategy(async (userEmail, password, done) => {
  let cart = [];
  try {
    const user = await userDao.getByEmail(userEmail);
    if(!await isValidPassowrd(user, password)) return done(null, false);
    const newCart = {
      author: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        location: user.location,
        phone: user.phone
      },
      products: []
    }
    cart.push(await cartsDao.createItem(createFormat(newCart)));
    await userDao.updateById(user._id, cart[0]._id);
    return done(null, user);
  }
  catch(error) { 
    (async () => await cartsDao.deleteItem(cart[0]._id))();
    infoLogger.warn({ message: error });
    done(null, false); 
  }
}));
passport.use("register", new LocalStrategy(
  { passReqToCallback: true }, 
  async (req, userEmail, password, done) => {
    const cart = [];
    try {
      const phone = `${dataLocation.find(e => req.body.location.split(" ")[0].toLowerCase() == e.prefix).code} ${req.body.phone}`;
      const location = dataLocation.find(e => req.body.location.split(" ")[0].toLowerCase() == e.prefix).country;
      const newCart = {
        author: {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: userEmail,
          location,
          phone
        },
        products: []
      }
      cart.push(await cartsDao.createItem(createFormat(newCart)));
      const newUser = {
        avatar: req.body.avatar,
        email: userEmail,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        location,
        phone,
        myCart: cart[0]._id,
        admin: userEmail.split(".")[0] == "admin" ? true : false,
        password: await createHash(password)
      }
      const user = await userDao.createUser(createFormat(newUser));
      await renderMail("users", user._id, newUser);
      await sendMail("users", "admin", `Nuevo registro`, user._id);
      return done(null, user);
    }
    catch (error) { 
      (async () => await cartsDao.deleteItem(cart[0]._id))();
      infoLogger.warn({ message: error });
      done(null, false); 
    }
  }
));

// Serializacion:
passport.serializeUser((user, done) => {
  consoleLogger._log("Inside serializer");
  done(null, user._id);
})

// Deserializacion:
passport.deserializeUser(async (id, done) => {
  consoleLogger._log("Inside deserializer");
  done(null, await userDao.getById(id));
})

export default passport;