const express = require("express"),
    app = express();
    layouts = require("express-ejs-layouts"),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    flash = require("connect-flash"),
    db = require("./models/index"),
    db.sequelize.sync({}); //alter:true

const session = require("express-session"),
flash = require("connect-flash");


multer = require('multer'),
multerGoogleStorage = require('multer-google-storage'),
cors = require('cors');
    
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

// core 오류 방지 설정
app.use(cors({
    origin: 'http://localhost:8080',
    
}));
    
//bodyParser 추가
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//파일 업로드를 위한 multer 설정
const upload = multer({
    storage: multerGoogleStorage.storageEngine({
        bucket: 'yorizori_post_img',
        projectId: 'burnished-core-422015-g1',
        keyFilename: '/home/g20221783/yorijori/secure/burnished-core-422015-g1-f3b170868aa8.json',
       
    }),
    limits: { fileSize: 5 * 1024 * 1024 }, // 파일 크기 제한 (예: 5MB)
});


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

//세션설정
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
  }));
  

const joinFundingRouter = require("./routers/joinFundingRouter.js")
// joinFundingRouter 접근
app.use("/joinfundingPage", joinFundingRouter);

// Router
const homeRouter = require("./routers/homeRouter.js")
const postRouter = require("./routers/postRouter.js")
const writeRouter = require("./routers/writeRouter.js")
const searchRouter = require("./routers/recipe/searchRouter.js"); 

// home 접근
app.get("/", homeRouter);
// search 접근
app.use("/search", searchRouter);
// post 접근
app.use("/posts", postRouter);
//write 접근
app.use("/write", writeRouter);

app.set("port", 8080);
app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});
