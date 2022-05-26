import { infoLogger } from "../../utils/config/logger.config.js";

const routesInfo = async (req, res, next) => {
  infoLogger.info({ 
    route: req.url, 
    method: `[${req.method}]` 
  });
  next();
};

export default routesInfo;