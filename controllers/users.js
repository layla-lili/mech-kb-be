const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res, next) => {
  try {
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound); //idle 10
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    res.statue(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.usename,
    exp: Date.now() + 900000, ///miliSeconds
  };
  jwt.sign(JSON.stringify(payload), "secretpassword");
  res.json({ token });
};
