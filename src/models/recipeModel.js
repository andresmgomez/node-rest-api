const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  picture: {
    type: String,
    required: [true, "Recipe needs to have a picture"],
  },
  name: {
    type: String,
    required: [true, "Recipe needs to have a name"],
  },
  author: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: [true, "Recipe needs to have a quick description"],
  },
  source: {
    type: String,
    required: false,
  },
  prepTime: {
    type: String,
    required: false,
  },
  cookTime: {
    type: String,
    required: [true, "Recipe needs to have starting cook time"],
  },
  servings: {
    type: Number,
    required: false,
  },
  ingredients: {
    type: [String],
    required: [true, "Recipe needs to have at least one ingredient"],
  },
  instructions: {
    type: [String],
    required: [true, "Recipe needs to have at least one instruction"],
  },
  tags: {
    type: [String],
    required: false,
  },
});

module.exports = mongoose.model("Recipe", recipeSchema);
