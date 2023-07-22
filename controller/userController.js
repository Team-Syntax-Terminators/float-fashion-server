const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
const User = require("../models/userModel");

// create a new user
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // user validation
  if (!name || !email || !password) {
    throw createHttpError(400, "All fields are mandatory.");
  }

  // check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw createHttpError(400, "User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({ id: user.id, name: user.name, email: user.email });
  } else {
    throw createHttpError(404, "User not found");
  }
});

module.exports = {
  createUser,
};
