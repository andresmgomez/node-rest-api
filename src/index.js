const fs = require("fs");
const express = require("express");

const app = express();
const port = 5000;

// Convert third party data into an array of objects
const mockRecipes = JSON.parse(
  fs.readFileSync(`${__dirname}/data/recipes.json`)
);

// Display third party content to client
app.get("/api/v1/recipes", (req, res) => {
  res.status(200).json({
    status: "success",
    results: mockRecipes.length,
    data: {
      restaurants: mockRecipes,
    },
  });
});

app.listen(port, () => {
  console.log(`Running RESTful API on port: ${port}...`);
});
