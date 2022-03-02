const router = require ('express').Router ();
const User = require ('../models/User');
const Post = require ('../models/Post');
const Category = require ('../models/Category');

//CREATE CATEGORY
router.post ('/', async (req, res) => {
  const newCategory = new Category (req.body);
  try {
    const savedCategory = await newCategory.save ();
    res.status (200).json (savedCategory);
  } catch (error) {
    res.status (500).json (error);
  }
});

//GET ALL
router.get ('/', async (req, res) => {
  try {
    const categories = await Category.find ();
    res.status (200).json (categories);
  } catch (error) {
    res.status (500).json (error);
  }
});

module.exports = router;
