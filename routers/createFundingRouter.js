const express = require('express');
const router = express.Router();
db = require("../models/index");
const createFundingController = require("../controllers/createFundingController.js");

router.get('/create_funding', createFundingController.showCreateFundingPage);
router.get('/create_funding_search', createFundingController.showCreateFundingSearchPage);
router.get('/create_funding/:productId', createFundingController.searchProducts);
router.get('/create_funding/:productId/creating', createFundingController.createFunding);
router.post('/create_funding_success/:productId/success', createFundingController.successFunding);

module.exports = router;