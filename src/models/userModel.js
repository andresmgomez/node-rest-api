const mongoose = require("mongoose");
const validator = require("validator");

const userModel = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Your name cannot be empty"],
    validate: [validator.isAlpha, "You need to enter a valid name"],
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: false,
    validate: [validator.isAlphaNumeric, "You need to enter a valid username"],
  },
  password: {
    type: String,
    trim: true,
    required: [true, "Your password cannot be empty"],
    validate: [
      validator.isStrongPassword,
      "You need to enter a secure password",
    ],
  },
  confirmPassword: {
    type: String,
    trim: true,
    required: true,
  },
  timestamps: true,
});

module.exports = mongoose.model("User", userModel);
