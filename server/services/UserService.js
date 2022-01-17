const TokenService = require("./TokenService");
const MailService = require("./MailService");
const UserModel = require("../models/UserModel");
const ApiError = require("../exceptions/ApiError");
const UserDto = require("../dto/UserDto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class UserService {
  async registration(email, password) {
    const { SITE_URL } = process.env;
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw ApiError.BadRequestError(
        `User with this email ${email} already exists`
      );
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(
      email,
      `${SITE_URL}/api/activate/${activationLink}`
    );
    const dto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...dto });
    await TokenService.saveToken(dto.id, tokens.refreshToken);

    return { ...tokens, user: dto };
  }
  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequestError(`The activation link is incorrect`);
    }
    user.isActivated = true;
    await user.save();
  }
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequestError("The login and password are incorrect.");
    }
    const isRecognized = await bcrypt.compare(password, user.password);
    if (!isRecognized) {
      throw ApiError.BadRequestError("The login and password are incorrect.");
    }
    const dto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...dto });
    await TokenService.saveToken(dto.id, tokens.refreshToken);

    return { user: dto, ...tokens };
  }
  async logout(refreshToken) {
    const removedToken = await TokenService.removeToken(refreshToken);
    return removedToken;
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const refreshTokenVerified = await TokenService.verifyRToken(refreshToken);
    const refreshTokenDB = await TokenService.findOneRToken(refreshToken);

    if (!refreshTokenDB || !refreshTokenVerified) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById({ id: refreshTokenVerified.id });
    const tokens = await TokenService.generateTokens();

    await TokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user,
    };
  }
  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }
}

module.exports = new UserService();
