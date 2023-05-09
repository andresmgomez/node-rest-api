const Recipe = require("../models/recipeModel");

exports.createRecipe = async (req, res) => {
  try {
    const newRecipe = await Recipe.create(req.body);

    res.status(201).json({
      status: "success",
      data: {
        recipe: newRecipe,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: "Unable to add a new recipe",
      error: err.message,
    });
  }
};
