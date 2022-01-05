const TokenService = require("./TokenService");
const MailService = require("./MailService");
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ email });
    if (candidate) {
      throw new Error(`User with this email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
    });
    await MailService.sendActivationMail(email, activationLink);
    const dto = new userDto(user);
    const tokens = TokenService.generateTokens({ ...dto });
    return { ...tokens, user: dto };
  }
}

module.exports = new UserService();
