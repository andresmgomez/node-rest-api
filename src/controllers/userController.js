const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    let addUser = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword,
    });
    const newUser = addUser.save();

    if (newUser) {
      res.status(201).json({
        status: "success",
        message: "User has been added successfully",
        data: {
          user: addUser,
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

exports.findUserIndentities = async (req, res) => {
  try {
    const userIdentity = await User.find({}, { _id: 1 });

    if (userIdentity) {
      res.status(200).send(userIdentity);
    }
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Invalid request! Unable to fetch users",
      error: [err.message],
    });
  }
};
