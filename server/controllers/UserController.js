const UserService = require("../services/UserService");

class UserController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ userData });
    } catch (e) {
      console.log(`Something went wrong in UserController -> registration`, e);
    }
  }
  async login(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Login" });
    } catch (e) {
      console.log(`Something went wrong in UserController -> login`, e);
    }
  }
  async logout(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Login" });
    } catch (e) {
      console.log(`Something went wrong in UserController -> login`, e);
    }
  }
  async refresh(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Refresh" });
    } catch (e) {
      console.log(`Something went wrong in UserController -> refresh`, e);
    }
  }
  async activate(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Activate" });
    } catch (e) {
      console.log(`Something went wrong in UserController -> activate`, e);
    }
  }
  async getUsers(req, res, next) {
    try {
      res.status(200).json({ message: "UserController Users" });
    } catch (e) {
      console.log(`Something went wrong in UserController -> users`, e);
    }
  }
}

module.exports = new UserController();
