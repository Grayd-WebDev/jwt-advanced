const UserController = require("../controllers/UserController");
const authMiddleware = require("../middlewares/authMiddleware");
const { Router } = require("express");
const { body } = require("express-validator");

const router = new Router();
router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", authMiddleware, UserController.getUsers);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

module.exports = router;
