const express = require("express"),
 app = express();
 layouts = require("express-ejs-layouts"),
 db = require("./models/index"),
 db.sequelize.sync();

 //View
 app.set('view engine', 'ejs');
 app.use(layouts);
 app.use(express.static('public')); //정적파일 사용

 //Router
 const homeRouter = require("./routers/homeRouter.js");
 const joinFundingRouter = require("./routers/joinFundingRouter.js");

 //home 접근
 app.get("/", homeRouter);

 //joinFunid 접근 (보류)
 //app.get('/fundingPage', joinFundingRouter);
 //app.get('/fundingPage/joinFunding', joinFundingRouter);
 //app.get('/joinFundingClick', joinFundingRouter);
 //app.get('/joinFundingComplete', joinFundingRouter);

 app.get('/fundingPage', (req, res) => {
	res.render('funding/fundingPage');
});
app.get('/joinFunding', (req, res) => {
	res.render('funding/joinFunding');
});
app.get('/joinFundingClick', (req, res) => {
	res.render('funding/joinFundingClick');
});
app.get('/joinFundingComplete', (req, res) => {
	res.render('funding/joinFundingComplete');
});
 
 app.set("port", 80);
 app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});