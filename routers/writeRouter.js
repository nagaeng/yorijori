const express = require('express');
const router = express.Router();
const writeController = require("../controllers/writeController");

router.get("/", writeController.getWritePage);
router.get("/getIngredients", writeController.getIngredients);

module.exports = router;
