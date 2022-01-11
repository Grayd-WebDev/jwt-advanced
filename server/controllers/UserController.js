const UserService = require("../services/UserService");
const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/ApiError");

class UserController {
  async registration(req, res, next) {
    try {
      const validated = validationResult(req);
      if (!validated.isEmpty()) {
        return next(ApiError.BadRequestError("The credentials are wrong.", validated.errors));
      }
      const { email, password } = req.body;
      const userData = await UserService.registration(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json({ userData });
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Login" });
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Login" });
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Refresh" });
    } catch (e) {
      next(e);
    }
  }
  async activate(req, res, next) {
    try {
      const { link } = req.params;
      await UserService.activate(link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (e) {
      next(e);
    }
  }
  async getUsers(req, res, next) {
    try {
      res.status(200).json({ message: "UserController Users" });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
