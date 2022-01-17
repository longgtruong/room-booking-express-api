const express = require("express");
const router = express.Router();
const { login, signup, authenticateRequired, updateUser } = require("../controllers/User");

router.post("/signup", signup)
router.post("/login", login)
router.put("/", authenticateRequired, updateUser)

module.exports = router;