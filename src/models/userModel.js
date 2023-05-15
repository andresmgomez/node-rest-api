const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const bcrypt = require("bcryptjs");

const nameValidator = [
  validate({
    validator: "isAlpha",
    passIfEmpty: false,
    message: "You need to enter a valid name",
  }),
];

const emailValidator = [
  validate({
    validator: "isEmail",
    passIfEmpty: false,
    message: "You need to enter a valid email address",
  }),
];

const passwordValidator = [
  validate({
    validator: "matches",
    arguments: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/i],
    passIfEmpty: false,
    message: "You need to enter a secure password",
  }),
];

const userModel = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "field cannot be empty"],
      validate: nameValidator,
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "field cannot be empty"],
      validate: nameValidator,
    },
    username: {
      type: String,
      lowercase: true,
      trim: true,
      required: [true, "field cannot be empty"],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      required: [true, "field cannot be empty"],
      validate: emailValidator,
    },
    password: {
      type: String,
      trim: true,
      required: [true, "field cannot be empty"],
      validate: passwordValidator,
    },
    confirmPassword: {
      type: String,
      trim: true,
      validate: {
        validator: function (typedPassword) {
          return typedPassword === this.password;
        },
        message: "field is not the same as password",
      },
    },
  },
  { timestamps: true }
);

userModel.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Encrypt password is user has changed it
    this.password = await bcrypt.hash(this.password, 12);
    // Do not store confirm password
    this.confirmPassword = undefined;
    next();
  }
});

module.exports = mongoose.model("User", userModel);
