const express = require("express");
const { register } = require("../controllers/register");
const { login } = require("../controllers/login");
const { logout } = require("../controllers/logout");
const { user } = require("../controllers/user");
const {
  resetPasswordMessage,
  resetPasswordReq,
} = require("../controllers/resetPass");
const { allUser } = require("../controllers/allUser");
const { makeAdmin } = require("../controllers/makeAdmin");
const router = express.Router();

router.get("/user/:email", user);
router.get("/all-users", allUser);
router.post("/make-admin/:email", makeAdmin);
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/reset", resetPasswordMessage);
router.post("/reset-password", resetPasswordReq);

module.exports = router;
