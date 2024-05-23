const express = require("express"),
    app = express();
layouts = require("express-ejs-layouts"),
    db = require("./models/index"),
    db.sequelize.sync({alter:true});

// View
app.set('view engine', 'ejs');
app.use(layouts);
app.use(express.static('public')); //정적파일 사용

// 모든 요청 전에 실행되는 미들웨어
app.use((req, res, next) => {
    res.locals.showCategoryBar = false; // 기본적으로 카테고리 바를 표시하지 않음
    res.locals.showSubCategoryBar = false; // 기본적으로 세부 카테고리 바를 표시하지 않음
    next();
});



const joinFundingRouter = require("./routers/joinFundingRouter.js")
// joinFundingRouter 접근
app.use("/joinfundingPage", joinFundingRouter);

// Router
const homeRouter = require("./routers/homeRouter.js")
const postRouter = require("./routers/postRouter.js")

// home 접근
app.get("/", homeRouter);

// post 접근
app.use("/posts", postRouter);


app.set("port", 80);
app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

