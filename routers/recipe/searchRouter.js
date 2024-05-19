const express = require('express');
const router = express.Router();
const searchController = require("../../controllers/recipe/searchController");

// 검색 페이지에 대한 GET 요청을 처리하는 라우터
router.get("/", searchController.searchResult);
// 검색 결과 sort하는 라우터

module.exports = router;
