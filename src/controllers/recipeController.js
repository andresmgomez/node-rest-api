const Recipe = require("../models/recipeModel");

exports.readQuickRecipe = async (req, res) => {
  try {
    const quickRecipeInfo = await Recipe.findOne(
      {
        name: req.params.recipeName,
      },
      {
        picture: 1,
        name: 1,
        author: 1,
        _id: 0,
      }
    );

    if (quickRecipeInfo) {
      return res.status(200).json({
        status: "success",
        data: {
          quickRecipe: quickRecipeInfo,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Invalid data! Unable to find recipe name",
      error: err.message,
    });
  }
};

exports.readRecipes = async (req, res) => {
  try {
    const allRecipes = await Recipe.find({}).limit(12);

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

exports.readRecipeContent = async (req, res) => {
  try {
    const singleRecipe = await Recipe.find(
      {
        _id: req.params.id,
      },
      {
        picture: 1,
        name: 1,
        description: 1,
        prepTime: 1,
        cookTime: 1,
        servings: 1,
        author: 1,
        ingredients: 1,
        instructions: 1,
        _id: 0,
      }
    );

    if (singleRecipe) {
      res.status(200).json({
        status: "success",
        data: {
          recipe: singleRecipe,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Invalid data! Unable to find selected recipe",
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
      status: "failed",
      message: "Invalid data! Unable to add a new recipe",
      error: [err.message],
    });
  }
};

exports.updateRecipeFields = async (req, res) => {
  try {
    const recipeFields = await Recipe.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (recipeFields) {
      res.status(200).json({
        status: "success",
        data: {
          updatedRecipe: recipeFields,
        },
      });
    }
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: "Invalid data! Unable to update recipe",
      error: [err.message],
    });
  }
};
