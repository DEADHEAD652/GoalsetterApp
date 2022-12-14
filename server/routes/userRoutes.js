const express = require("express");
const route = express.Router();
const User = require("../models/userModal");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const auth = require("../Auth/authMiddleware");
//register user
route.post("/user", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    res.send("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(404).send("user already exist");
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).send("Invalid user data");
  }
});

//Login user
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //check for user email
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(400).send("invalid credentails");
  }
});

//display user data
route.get("/me", auth, async (req, res) => {
  const { _id, email, name } = await User.findById(req.user.id);
  res.status(200).json({ id: _id, email, name });
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_Secret, { expiresIn: "30d" });
};
module.exports = route;
