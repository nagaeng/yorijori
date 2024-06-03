const express = require('express');
const router = express.Router();
db = require("../models/index");
const createFundingController = require("../controllers/createFundingController.js");

router.get('/create_funding_search', createFundingController.showCreateFundingSearchPage);
router.get('/search_results', createFundingController.searchProducts);
router.get('/product_detail/:productId', createFundingController.productDetail);
router.get('/create_funding/:productId', createFundingController.showCreateFundingPage);
router.post('/create_funding', createFundingController.sendCreateFundingPage);
router.get('/create_funding_success/:fundingGroupId', createFundingController.createFunding);

module.exports = router;