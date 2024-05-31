const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
//const homeController = require('../controllers/homeController');
const errorController = require('../controllers/errorController');
const myPageController = require('../controllers/myPageController');
const layouts = require('express-layouts');

// 미들웨어 설정
router.use(layouts);
router.use(express.static("public"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// 홈 페이지 라우트
//router.get("/", homeController.index);


// 로그인 관련 라우트 추가
//router.post("/authenticate", usersController.authenticate);
// router.get("/login", usersController.login); // 로그인 페이지 렌더링
//router.post("/authenticate", usersController.authenticate, usersController.redirectView); // 로그인 인증 처리
// router.get("/logout", usersController.logout, usersController.redirectView); // 로그아웃 처리

router.get("/login", usersController.login);
router.post("/login", usersController.authenticate);
//router.post("/login", usersController.authenticate, usersController.redirectView);

router.get("/logout", usersController.logout, usersController.redirectView);

router.get("/newuser", usersController.new);
router.post("/newuser/create", usersController.create, usersController.redirectView);

router.get("/auth/:id/edit", usersController.edit);
router.post("/auth/:id/update", usersController.update, usersController.redirectView);
//router.post("/auth/:id/delete", usersController.delete, usersController.redirectView);

router.get("/mypage", myPageController.mypageMain);
router.get("/mypageScrap", myPageController.mypageScrap);
router.get("/mypageComment", myPageController.mypageComment);

module.exports = router;