const Recipe = require("../models/recipeModel");

exports.readRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({}).toArray();

    res.status(200).json({
      status: "success",
      results: allRecipes.length,
      data: {
        recipes: allRecipes,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error has occurred. Unable to fetch recipes",
      error: err.message,
    });
  }
};

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    return res.status(201).json({
      status: "success",
      data: {
        recipe: newRecipe,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "An error has occurred. Unable to add a new recipe",
      error: err.message,
    });
  }
};
