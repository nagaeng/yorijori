const express = require('express');
const router = express.Router();
db = require("../models/index");
const postController = require("../controllers/postController");

// router.get("/", postController.getAllPosts);
router.get("/noLoginRecommend", postController.getNoLoginRecommendPosts);
router.get("/loginRecommend", postController.getLoginRecommendPosts);
router.get("/:category", postController.getPostsByCategory);
router.get("/:category/:subcategory", postController.getPostsBySubcategory);

module.exports = router;