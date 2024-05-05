const express = require("express"),
 app = express(),
 homeController= require("./controllers/homeController");
 layouts = require("express-ejs-layouts"),
 db = require("./models/index"),
 db.sequelize.sync();

 app.set('view engine', 'ejs');
 app.use(layouts);

 app.get("/", homeController.getHomePage);
 
 app.set("port", 80);
 app.listen(app.get("port"), "0.0.0.0", () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
});