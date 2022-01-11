const { Router } = require("express");
const UserController = require("../controllers/UserController");
const router = new Router();
const { body } = require("express-validator");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

module.exports = router;
