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
        console.log("Search Query:", searchIngredient); //재료 검색어 확인

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
        console.log("Search Query:", searchMenu); //매뉴 검색어 확인

        //db에서 받아올 매뉴 배열
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


// 게시글 post 
exports.postWrite = async (req, res) => {
    try {
        console.log(`요청 :`,req.body.title);
        console.log(`요청 :`,req.body.menu);
        console.log(`요청 :`,req.body.category);
        console.log(`요청 :`,req.body.editordata);
        let writeInfo = {
            title: req.body.title,
            menu : req.body.menu,
            category : req.body.category,
            ingredients :[req.body.ingredient],

        }
       
    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};

//이미지 gcp 로 보내고 url 반환
//받은 url 이미지 db에 담고 client로 넘김 
exports.postImage = async (req,res)=>{
    try{
        console.log(req.file);
        //이미지url 담아올 변수
        let imgurl='';
        if(req.file != undefined){
            imgurl = req.file.path; 
        }
        console.log('전달할 url', JSON.stringify(imgurl));
        res.json({ url: imgurl });
    }
    catch(err){
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
    })
    }
}
