const express = require("express");
const router = express.Router();

const { signUp, login, getUsers } = require("../controllers/userControllers");

router.get("/", getUsers);
router.post("/signup", signUp); //http://localhost:4000/api/user/signup
router.post("/login", login);

module.exports = router;
