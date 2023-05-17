const jwt = require("jsonwebtoken");

const local = require("../private/secrets");
const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    let newUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });

    if (newUser) {
      const addUser = await newUser.save();
      const authToken = jwt.sign({ id: addUser._id }, local.JWT_SECRET_TOKEN, {
        expiresIn: local.JWT_EXPIRATION_DATE,
      });

      res.status(201).json({
        status: "success",
        authToken,
        message: "User has been added successfully",
        data: {
          user: newUser,
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Invalid request! Unable to add user",
      error: [err.message],
    });
  }
};

const findUserIndentities = async (req, res) => {
  try {
    const userIdentity = await User.find({}, { _id: 1 });

    if (userIdentity) {
      return res.status(200).send(userIdentity);
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Invalid request! Unable to fetch users",
      error: [err.message],
    });
  }
};
