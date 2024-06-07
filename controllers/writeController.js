const db = require("../models"),
    Ingredient = db.ingredient,
    Menu = db.menu,
    Post = db.post,
    Image = db.image,
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
        res.json({ url: imgurl }); //json 객체로 넘긴다. 
    }
    catch(err){
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
    })
    }
}

// 게시글 post 
exports.postWrite = async (req, res) => {
    try {
        console.log(`요청 :`,req.body);
        let menu=[];
        
        //받은 메뉴이름으로 id 찾기
        menu = await Menu.findAll({
                attributes: ['menuId'],
                where: {
                    menuName: {
                        [Op.like]: `%${req.body.menu}%`
                    }
                }
            });    

        //메뉴 id 확인
        console.log(`menu :`,menu[0].dataValues.menuId);
        
        //currentDate 를 위한 데이트 객체 생성
        const currentDate = new Date();
        
        //post 
        if(req.body){
            await Post.create({
                  title: req.body.title,
                  content: req.body.editordata,
                  date: currentDate,
                  menuId: menu[0].dataValues.menuId,
                  userId: 1, //로그인 구현 안되어있어서 임의로 넣음
          });
        }
    
        //post id 찾기
        let searchPostId = await Post.findAll({
                where:
                {
                    title:{
                        [Op.like]: `%${req.body.title}%` } //title로 찾음. 중복불가 처리해놓음
                }
            });

        //post id 확인
        console.log('postid :' ,searchPostId[0].dataValues.postId);

        // req.body.files가 배열인지 확인하고, 배열이 아닌 경우 배열로 변환
        let files = Array.isArray(req.body.files) ? req.body.files : [req.body.files];
        console.log(files);
        //imgurl 디비에 저장 
        if(req.body.files != ''){
            for(let i=0; i<files.length; i++){ //이미지 여러개 처리
                //gcp 경로 + 원본파일이름 =이미지 url 
                let img_url = `https://yorizori_post_img.storage.googleapis.com/yorizori_post_img/${files[i]}`;

                await Image.create({
                      //autoincrement 안되어있어서 임의로 넣음
                        postId: searchPostId[0].dataValues.postId,
                        imageUrl:img_url
                    });
                }
        }
        //post된 ingredientId 찾아서 메뉴 db에 넣기
        let ingredient = Array.isArray(req.body.ingredi) ? req.body.ingredi : [req.body.ingredi];
        for(let i=0; i<ingredient.length; i++){
            let ingredientArr = await Ingredient.findAll({
                where:{
                    ingredientName:{
                        [Op.like]:`%${ingredient[i]}%`
                    }
                }
            });
            console.log("재료 :",ingredientArr[0].dataValues.ingredientId);
       
          //  menu usage 디비에 저장
            await Usage.create({
                ingredientId: ingredientArr[0].dataValues.ingredientId,
                postId: searchPostId[0].dataValues.postId
            });
        
        }
          res.render('write');
    } catch (err) {
        console.error("Error loading the write page:", err);
        res.status(500).send({
            message: "Error loading the write page"
        });
    }
};