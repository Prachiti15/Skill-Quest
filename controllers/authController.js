const jswt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const db = require("../database/db");
const User = require("../database/models/user.js");

const Register = async (req, res) => {
  const user = await db
    .get()
    .collection("Users")
    .findOne({ email: req.body.email });
  if (user) {
    return res.status(400).send({
      message: "User already Registered",
    });
  }
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: await bcryptjs.hash(req.body.password, 10),
    score : [0,0,0,0,0],
    currentLevel : 1,
    time : [0,0,0,0,0],
    totalTime : 0.0,
    totalScore : 0.0
  });
  await db.get().collection("Users").insertOne(newUser);
  const { password, ...data } = newUser['_doc'];
  res.redirect('/auth/login')
};

const Login = async (req, res) => {
  const user = await db
    .get()
    .collection("Users")
    .findOne({ email: req.body.email });
  if (!user) {
    res.status(404).send({
      message: "User not found",
    });
  } else if (!(await bcryptjs.compare(req.body.password, user.password))) {
    res.status(400).send({
      message: "Invalid Credentials",
    });
  } else {
    res.status(200).send({
      user
    });
  }
};

const Logout = async (req, res) => {
  res.status(200).send({
    message: "success",
  });
};


module.exports = {
  Register,
  Login,
  Logout,
};
