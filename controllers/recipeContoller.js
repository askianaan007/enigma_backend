const axios = require("axios");
const User = require("../models/userModel.js")


exports.fetchFoodByCategory = async (req, res, next) => {
  const { category } = req.query;
  try {
    const response = await axios.get(
      `${process.env.MEALDB_API_URL}/filter.php?c=${category}`
    );
    const recipes = response.data.meals;

    if (recipes) {
      res.status(200).json(recipes);
    } else {
      res.status(404).json({ message: "No recipes found for this category" });
    }
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ message: "Error fetching recipes" });
  }
};

exports.favoiriteFood = async (req, res, next) => {
  const { recipeId } = req.body; 
  const userId = req.user.id;
  try {
    const user = await User.findById(userId);
    if (!user.favoriteRecipes.includes(recipeId)) {
      user.favoriteRecipes.push(recipeId); 
      await user.save();
      return res.status(200).json({ message: "Recipe added to favorites." });
    } else {
      return res
        .status(400)
        .json({ message: "Recipe is already in favorites." });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);
    res.status(500).json({ message: "Error adding recipe to favorites." });
  }
};
