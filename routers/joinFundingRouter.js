const express = require('express');
const router = express.Router();
db = require("../models/index");
const joinFundingController = require("../controllers/joinFundingController");

// router.get("/fundingPage", joinFundingController.fundingPage, joinFundingController.getFundingPage); //펀딩페이지
router.get("/fundingPage", joinFundingController.getFundingPage);
router.get("/joinFunding", joinFundingController.getJoinFunding); //펀딩참여페이지
//이거 post인가 router.get("/fundingPage/:id", joinFundingController.openFunding, joinFundingController.getOpenFunding); 

router.get("/joinFundingClick", joinFundingController.getJoinFundingClick); //펀딩참여확인페이지
router.get("/joinFundingComplete", joinFundingController.getJoinFundingComplete); //펀딩완료페이지

module.exports = router;