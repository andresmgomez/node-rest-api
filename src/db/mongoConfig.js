const mongoose = require("mongoose");

exports.connectToDatabase = (dbURI, dbName) => {
  try {
    const checkConnection = mongoose.connect(
      dbURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      {
        dbName,
      }
    );

    if (checkConnection) {
      console.log("Successful Connection to Cloud Database\n");
    }
  } catch (err) {
    console.error({
      status: "error",
      message: "Unable to connect to Mongo Atlas Database",
      error: err.message,
    });
  }
};
