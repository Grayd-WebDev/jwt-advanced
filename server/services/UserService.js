const TokenService = require("./TokenService");
const MailService = require("./MailService");
const UserModel = require("../models/UserModel");
const UserDto = require("../dto/UserDto");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class UserService {
  async registration(email, password) {
    const { SITE_URL } = process.env;
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
    await MailService.sendActivationMail(
      email,
      `${SITE_URL}/api/activate/${activationLink}`
    );
    const dto = new UserDto(user);
    const tokens = TokenService.generateTokens({ ...dto });
    return { ...tokens, user: dto };
  }
}

module.exports = new UserService();
