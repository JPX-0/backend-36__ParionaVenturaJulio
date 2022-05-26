import STATUS from "../../utils/constants/api.constants.js";
import formatResponse from "../../utils/formatter/send.format.js";

const isAdmin = (req, res, next) => {
  const admin = req.user.admin;
  if(admin) return next();
  const message = `You do not have the necessary permissions to access this page`;
  res.status(STATUS.NOT_AUTHORIZED.code).json(formatResponse(true, STATUS.NOT_AUTHORIZED, message));
};

export default isAdmin;