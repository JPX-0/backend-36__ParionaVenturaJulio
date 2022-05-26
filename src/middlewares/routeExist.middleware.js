import { warnLogger } from "../../utils/config/logger.config.js";
import STATUS from "../../utils/constants/api.constants.js";
import formatResponse from "../../utils/formatter/send.format.js";

const routeExist = (req, res, next) => {
  const method = `[${req.method}]`;
  const message = `The route ${req.originalUrl} with method ${method} was not implemented`;
  if(req.originalUrl) {
    warnLogger.warn({ route: req.url, method });
    return res.status(STATUS.NOT_FOUND.code).json(formatResponse(true, STATUS.NOT_FOUND, message));
  }
  next();
};

export default routeExist;