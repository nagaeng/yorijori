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
 const homeRouter = require("./routers/homeRouter.js")

 //home 접근
 app.get("/", homeRouter);

 
 app.set("port", 80);
 app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});