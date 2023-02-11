const router = require("express").Router();
const Category = require("../models/Category.js");

router.post("/", async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const saveCategory = await newCategory.save();
    res.status(200).json(saveCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Get categories
router.get("/", async (req, res) => {
  try {
    const categories = await (Category.find())
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
