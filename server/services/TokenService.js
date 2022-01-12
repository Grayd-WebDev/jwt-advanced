const jwt = require("jsonwebtoken");
const TokenModel = require("../models/TokenModel");

class TokenService {
  generateTokens(payload) {
    const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = process.env;

    const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY, {
      expiresIn: "30d",
    }); 
    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = TokenModel.create({ user: userId, refreshToken });
    return token;
  }
}

module.exports = new TokenService();
