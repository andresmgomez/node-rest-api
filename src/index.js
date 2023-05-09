const express = require("express");

const app = express();
const port = 5000;

const recipeRoutes = require("./routes/recipeRoutes");

app.use(express.json());
app.use("/api/v1/recipes", recipeRoutes);

app.listen(port, () => {
  console.log(`Running RESTful API on port: ${port}...`);
});
