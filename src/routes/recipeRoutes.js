const express = require("express");
const recipeController = require("../controllers/recipeController");

const router = express.Router();

router
  .route("/")
  .get(recipeController.readRecipes)
  .post(recipeController.createRecipe);

router
  .route("/:id")
  .get(recipeController.readRecipeContent)
  .patch(recipeController.updateRecipeFields);

router.route("/name/:recipeName").get(recipeController.readQuickRecipe);

module.exports = router;
