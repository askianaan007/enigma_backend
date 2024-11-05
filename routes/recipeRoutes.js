const express = require("express");
const {
  fetchFoodByCategory,
  favoiriteFood,
} = require("../controllers/recipeContoller");
const { isAuthenticatedUser } = require("../middlewares/authenticate");

const router = express.Router();

router.route("/fetch").get(fetchFoodByCategory);
router.route("/favourite").post(isAuthenticatedUser, favoiriteFood);

module.exports = router;
