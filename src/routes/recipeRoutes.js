const express = require("express");
const recipeController = require("../controllers/recipeController");

const router = express.Router();

router
  .route("/")
  .get(recipeController.readRecipes)
  .post(recipeController.createRecipe);

module.exports = router;
