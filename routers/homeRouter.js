const express = require('express');
const router = express.Router();
db = require("../models/index");
const homeController = require("../controllers/homeController");

router.get("/", homeController.getHomePage);

module.exports = router;