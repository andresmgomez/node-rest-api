const User = require("../models/userModel");

exports.createUser = async (req, res) => {
  try {
    let addUser = await User.create(req.body);
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
