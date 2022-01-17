const ApiError = require("../exceptions/ApiError");
const TokenService = require("../services/TokenService");

module.exports = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) {
      return next(ApiError.UnauthorizedError());
    }
    const accessToken = auth.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }
    const userData = await TokenService.verifyAToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
