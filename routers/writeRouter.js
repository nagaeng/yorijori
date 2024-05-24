const express = require('express');
const router = express.Router();
const writeController = require("../controllers/writeController");

router.get("/", writeController.getWritePage); //글쓰기페이지 이동
router.get("/getIngredients", writeController.getIngredients); //재료 검색(요청)시 컨트롤러로 넘김
router.get("/getMenu",writeController.getMenu); // 메뉴 검색(요청) 시 컨트롤러로 넘김
router.post("/postWrite",writeController.postWrite);
module.exports = router;
