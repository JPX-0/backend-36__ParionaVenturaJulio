import env from "./env.config.js";

export default {
  mongodb: {
    connectTo: database => `mongodb+srv://${env.DB_MAIL}:${env.DB_PASS}@${env.DB_NAME}.mongodb.net/${database}?retryWrites=true&w=majority`
  }
};