const express = require("express");
const app = express();
const errorController = require("./controllers/errorController");
const homeController = require("./controllers/homeController");
const layouts = require("express-ejs-layouts");
const db = require("./models/index");
const flash = require('connect-flash');
const session = require('express-session');

// 데이터베이스 동기화
db.sequelize.sync({});

// 뷰 엔진 설정
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('public')); // 정적 파일 사용

// 모든 요청 전에 실행되는 미들웨어
app.use((req, res, next) => {
    res.locals.showCategoryBar = false; // 기본적으로 카테고리 바를 표시하지 않음
    res.locals.showSubCategoryBar = false; // 기본적으로 세부 카테고리 바를 표시하지 않음
    next();
});

// app.use(errorController.logErrors);
// app.listen(app.get("port"), () => {
//     console.log('Server running at http://localhost:${app.get("port")}');
// })

// exports.respondNoResourceFound = (req, res) => {
//     let errorCode = httpStatus.NOT_FOUND;
//     res.status(errorCode);
//     res.send('${errorCode} | The page does not exist');
// };

// exports.respondInternelError = (error, req, res, next) => {
//     let errorCode = httpStatus.INTERNAL_SERVER_ERROR;
//     console.log('Error occurred: ${error.stack}');
//     res.status(errorCode);
//     res.send('${errorCode} | Sorry our application is experiencing a problem');
// };

// 미들웨어 설정
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 라우터 설정
const homeRouter = require("./routers/homeRouter");
const postRouter = require("./routers/postRouter");
const joinFundingRouter = require("./routers/joinFundingRouter");
const authRouter = require("./routers/authRouter");

// home 접근
app.get("/", homeRouter);

// post 접근
app.use("/posts", postRouter);

// 세션 설정
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

//플래시 메시지 미들웨어 설정
app.use(flash());

// 전역 변수 설정 (플래시 메시지를 모든 템플릿에서 사용할 수 있도록 설정)
app.use((req, res, next) => {
    res.locals.successMessages = req.flash('success');
    res.locals.errorMessages = req.flash('error');
    next();
});

app.set('view engine', 'ejs');

// 라우터 설정
app.use('/auth', authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// joinFunding 접근
app.use("/joinfundingPage", joinFundingRouter);

// 로그인 및 사용자 관리 접근
app.use("/auth", authRouter);

// 서버 실행
app.set("port", 80);
app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

module.exports = app;
