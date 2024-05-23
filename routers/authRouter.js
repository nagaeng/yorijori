const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
//const homeController = require('../controllers/homeController');
const errorController = require('../controllers/errorController');
const layouts = require('express-layouts');

// 미들웨어 설정
router.use(layouts);
router.use(express.static("public"));
router.use(express.urlencoded({ extended: false }));
router.use(express.json());

// 홈 페이지 라우트
//router.get("/", homeController.index);


/*
// 추가적인 라우트 설정 /auth/editpwd
app.get("/editpwd", (req, res) => {
    res.render("auth/editpwd");
});
app.get("/newuser", (req, res) => {
    res.render("auth/newuser");
});
app.get("/mypageMain", (req, res) => {
    res.render("auth/mypage_main");
});
app.get("/mypageComment", (req, res) => {
    res.render("auth/mypage_comment");
});
app.get("/mypageScrap", (req, res) => {
    res.render("auth/mypage_scrap");
});
*/

/*
// 사용자 관련 라우트
router.get("/", usersController.index, usersController.indexView);
router.get("/newuser", usersController.new);
router.post("/create", usersController.create, usersController.redirectView);
router.get("/:id/editpwd", usersController.edit);
router.post("/:id/update", usersController.update, usersController.redirectView);
router.get("/:id", usersController.show, usersController.showView);
*/

// 로그인 관련 라우트 추가
router.get("/login", usersController.login); // 로그인 페이지 렌더링
router.post("/authenticate", usersController.authenticate, usersController.redirectView); // 로그인 인증 처리
// router.get("/logout", usersController.logout, usersController.redirectView); // 로그아웃 처리

// 에러 처리 라우트
// router.use(errorController.pageNotFoundError);
// router.use(errorController.internalServerError);

module.exports = router;
