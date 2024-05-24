const db = require("../models"),
    Ingredient = db.ingredient,
    Menu = db.menu,
    Usage = db.usage,
    Sequelize = require('sequelize'),
    Op = Sequelize.Op;


exports.getWritePage = async (req, res) => {
    try {
        res.render('write'); // 검색 결과와 검색어를 뷰에 전달
    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

exports.getIngredients = async (req, res) => {
    try {
        const searchIngredient = req.query.searchIngredient || ''; //url로 받아오기
        console.log("Search Query:", searchIngredient); //검색어 확인

        //db에서 받아올 재료 배열
        let ingredients = []; 
        
        if (searchIngredient) { 
            ingredients = await Ingredient.findAll({
                where: {
                    ingredientName: {
                        [Op.like]: `%${searchIngredient}%`
                    }
                }
            });    
        }
       
        res.send({ingredients}); //재료배열 전달
        console.log("Ingredients Found:", ingredients); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

exports.getMenu = async (req, res) => {
    try {
        const searchMenu = req.query.searchMenu || ''; //url로 받아오기
        console.log("Search Query:", searchMenu); //검색어 확인

        //db에서 받아올 재료 배열
        let selectMenu = []; 
        
        if (searchMenu) { 
            selectMenu = await Menu.findAll({
                where: {
                    menuName: {
                        [Op.like]: `%${searchMenu}%`
                    }
                }
            });    
        }
       
        res.send({selectMenu});
        console.log("Ingredients Found:", selectMenu); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

exports.getMainCategory = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery || ''; //url로 받아오기
        console.log("Search Query:", searchQuery); //검색어 확인

        //db에서 받아올 재료 배열
        let ingredients = []; 
        
        if (searchQuery) { 
            ingredients = await Menu.findAll({
                where: {
                    category: {
                        [Op.like]: `%${searchQuery}%`
                    }
                }
            });    
        }
       
        res.render('write',{ingredients});
        console.log("Ingredients Found:", ingredients); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};


exports.postWrite = async (req, res) => {
    try {
        let writeInfo = {
            title: req.body.title,
            content : req.body.data,
            
        }
        const title = req.body.title;
        const category = req.body.category;
        const menu = req.body.menu; 
       
        console.log("Search Query:", title); //받아온 body 중 title 확인

        
        if (searchQuery) { 
            ingredients = await Menu.findAll({
                where: {
                    category: {
                        [Op.like]: `%${searchQuery}%`
                    }
                }
            });    
        }
       
        res.render('write',{ingredients});
        console.log("Ingredients Found:", ingredients); // 검색 결과 확인

    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

