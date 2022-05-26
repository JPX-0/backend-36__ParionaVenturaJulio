import env from '../../utils/config/env.config.js';
import { args } from '../index.js';
import ProductsDao from '../../models/daos/Products.dao.js';
import CartsDao from '../../models/daos/Cart.dao.js';
import STATUS from '../../utils/constants/api.constants.js';
import renderMail from '../../utils/config/mail.config.js';
import sendMail from '../../utils/config/nodemailer.config.js';
import sendMessage from '../../utils/config/twilio.config.js';

const productsDao = new ProductsDao();
const cartsDao = new CartsDao();

const getInfo = async (req, res) => {
  const { default: os } = await import("os");
  res.render('info', { 
    inputArguments: JSON.stringify(args), 
    platformName: process.platform, 
    versionNode: process.version, 
    rss: process.memoryUsage().rss, 
    path: `"${process.argv[0]}"`,
    processId: process.pid, 
    projectFolder: `"${process.cwd()}"`,
    numOfProcessors: os.cpus().length
  });
}

const getHome = (req, res) => {
  res.render('home');
}

const getProducts = async (req, res) => {
  const { maxPrice, searchName } = req.query;
  const products = [await productsDao.getByPriceProducts(maxPrice), await productsDao.getByNameProducts(searchName), await productsDao.getAll()]
  const value = maxPrice == undefined ? "1000" : maxPrice;
  const searchProducts = (maxPrice && products[0]) || (searchName && products[1]) || products[2];
  if(products) return res.render('products', { value, searchProducts });
}

const getDetails = async (req, res) => {
  const { idProduct } = req.params;
  const product = await productsDao.getById(idProduct);
  const message = `the ID: "${idProduct}" entered does not match any product in our database`
  if(!product) return res.status(STATUS.BAD_REQUEST.code).json(formatResponse(false, STATUS.BAD_REQUEST, message));
  res.render("detail", { product });
}

const pushCart = async (req, res) => {
  const { id, qty } = req.query;
  const product = await productsDao.getById(id);
  if(product) {
    const cart = await cartsDao.getById(req.user.myCart);
    cart.products.push(id);
    await cartsDao.updateById(req.user.myCart, cart.products);
    return res.redirect('/cart');
  }
  res.redirect('/home');
}

const getCart = async (req, res) => {
  const cart = await cartsDao.getById(req.user.myCart);
  const products = [];
  for (let i = 0; i < cart.products.length; i++) {
    const elem = cart.products[i];
    const product = await productsDao.getById(elem);
    products.push(product);
  }
  if(cart.products.length == 0) return res.render('cart', { products });
  if(products.length != 0) return res.render('cart', { products });
}
const buyCart = async (req, res) => {
  const { success } = req.query;
  const cart = await cartsDao.getById(req.user.myCart);
  const products = [];
  if(success == "true") {
    await sendMessage("sms", req.user.phone, `Su pedido ha sido recibido y se encuentra en proceso.`)
    for (let i = 0; i < cart.products.length; i++) {
      products.push(await productsDao.getById(cart.products[i]._id));
      await productsDao.deleteItem(cart.products[i]._id);
    }
    await renderMail("carts", req.user._id, products);
    const userEmail = req.user.admin ? "admin" : req.user.email;
    await sendMail("carts", userEmail, `Nuevo pedido de: ${req.user.firstname} - ${req.user.email}`, req.user._id);
    await sendMessage("whatsapp", req.user.phone, `Nuevo pedido de: ${req.user.firstname} - ${req.user.email}`)
    await cartsDao.updateById(req.user.myCart, []);
    return res.redirect('/home');
  }
  res.redirect('/cart');
}

const getLogout = async (req, res) => {
  const user = req.user.email;
  await cartsDao.deleteItem(req.user.myCart);
  req.logout();
  req.session.destroy(err => {
    if(err) res.clearCookie(env.SESSION_NAME);
    res.render("logout", { nombre: user });
  });
  res.clearCookie(env.SESSION_NAME);
}

const getError = (req, res, page) => {
  const message = `USER ERROR ${page == "register-error" ? "SIGNUP" : "LOGIN"}`;
  res.render('error-session', { title: page, message });
}

export {
  getHome,
  getProducts,
  getDetails,
  pushCart,
  getCart,
  buyCart,
  getLogout,
  getError,
  getInfo
}