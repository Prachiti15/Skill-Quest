const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const path = require("path");

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/auth", "/login.html"))
})

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/auth", "/register.html"))
})

router.post("/register", authController.Register);

router.post("/login", authController.Login);

router.post("/logout", authController.Logout);

module.exports = router;
