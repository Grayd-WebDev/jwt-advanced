const { Router } = require("express");
const UserController = require("../controllers/UserController");
const router = new Router();

router.post("/registration", UserController.registration);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);
router.get("/users", UserController.getUsers);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);

module.exports = router;
