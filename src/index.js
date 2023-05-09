const express = require("express");
const morgan = require("morgan");

const local = require("./private/secrets");
const mongodb = require("./db/mongoConfig");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/recipes", recipeRoutes);

app.listen(local.PORT, () => {
  console.log(`\nRunning RESTful API on port: ${local.PORT}...`);
  mongodb.connectToDatabase(local.DATABASE, "recipes");
});
