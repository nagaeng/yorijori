const express = require('express');
const router = express.Router();
db = require("../models/index");
const joinFundingController = require("../controllers/joinFundingController");

// const session = require("express-session"),
//     flash = require("connect-flash");

// router.use(flash());
// router.use
router.get("/fundingPage", joinFundingController.getFundingPage);//펀딩페이지
router.get("/fundingSearch", joinFundingController.fundingSearch, joinFundingController.getFundingSearch ); //펀딩검색페이지
router.get("/joinFunding/:groupId", joinFundingController.joinFunding, joinFundingController.getJoinFunding); //펀딩참여페이지
router.get("/joinFunding/:groupId/join", joinFundingController.joinFunding, joinFundingController.getJoinFundingClick); //펀딩참여확인페이지
// router.post("/joinFunding/:groupId/joinRequest", joinFundingController.joinRequest, )
// router.post(); //신청하면 정보 데베에 보내는거?
router.get("/joinFundingComplete/:groupId/complete", joinFundingController.joinFunding, joinFundingController.joinRequest,  joinFundingController.getJoinFundingComplete); //펀딩완료페이지

module.exports = router;