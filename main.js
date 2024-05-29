const express = require("express"),
    app = express();
layouts = require("express-ejs-layouts"),
    db = require("./models/index"),
    db.sequelize.sync({}); //alter:true

// const router = express.Router();

const session = require("express-session"),
flash = require("connect-flash");

app.use(flash()); //플래시메세지

app.use(session({
    secret: 'your_secret_key', // 비밀 키를 원하는 값으로 설정하세요
    resave: false,
    saveUninitialized: true
}));

app.use((req,res,next)=>{
res.locals.flashMessages = req.flash();
next();
})

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

// app.get("/joinfundingPage/fundingPage", (req,res)=> {res.render("funding/joinFundingComplete")});

const joinFundingRouter = require("./routers/joinFundingRouter.js")
// joinFundingRouter 접근
app.use("/joinfundingPage", joinFundingRouter);

// Router
const homeRouter = require("./routers/homeRouter.js")
const postRouter = require("./routers/postRouter.js")
const searchRouter = require("./routers/recipe/searchRouter.js"); 

// home 접근
app.get("/", homeRouter);
// search 접근
app.use("/search", searchRouter);
// post 접근
app.use("/posts", postRouter);


app.set("port", 80);
app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});

