import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "./middlewares/passport.middleware.js";

import env from "../utils/config/env.config.js";
import dbConfig from "../utils/config/db.config.js";
import routes from "./routers/app.routes.js";

import { Server as HttpServer } from "http";

import routesInfo from "./middlewares/routeInfo.middleware.js";
import routeExist from "./middlewares/routeExist.middleware.js";

const mainServer = (args) => {
  //--------------------------------------------
  // instancio servidor, socket y api
  const app = express();
  const httpServer = new HttpServer(app);

  //--------------------------------------------
  // configuro el servidor
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static("public"));

  app.use(session({
    name: env.SESSION_NAME,
    store: MongoStore.create({ 
      mongoUrl: dbConfig.mongodb.connectTo("sessions") 
    }),
    secret: [env.SESSION_SECRET],
    resave: false,
    saveUninitialized: false,
    // cookie: { maxAge: 600000 } // se cerrará la sesion en 10mints.
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  //--------------------------------------------
  // Template engines
  app.set("views", "./views");
  app.set("view engine", "ejs");

  //--------------------------------------------
  // Midlewares (lee rutas)
  app.use(routesInfo);

  //--------------------------------------------
  // rutas del servidor
  app.use("/", routes);

  //--------------------------------------------
  // Middlewares (verifica rutas)
  app.use('/*', routeExist);

  //--------------------------------------------
  // inicio el servidor
  const connectedServer = httpServer.listen(args.PORT, () => {
    console.log(`Server is up and running on port: ${args.PORT}`);
    mongoose.connect(dbConfig.mongodb.connectTo("ecommerce"))
      .then(() => console.log("Connected to DB!"))
      .catch(error => console.log(`An error occurred while connecting the database ${error}`))
  });
  connectedServer.on("error", error => console.error(error.message));
}

export default mainServer;