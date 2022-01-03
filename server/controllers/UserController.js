class UserController {
  async registration(req, res, next) {
    try {
      return res.status(200).json({ message: "UserController Registration" });
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
