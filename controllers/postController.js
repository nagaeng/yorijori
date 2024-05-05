const db= require("../models/index"),
Post = db.post,
Op = db.Sequelize.Op;

exports.getAllPosts = async (req, res) => {
    try {
        data = await Post.findAll();
        console.log(data);
        res.render("posts", {posts: data});
    } catch (err) {
        res.status(500).send({
        message: err.message
        });
    }
};

exports.getPostsByCategory = (req, res) => {
    const category = req.params.category;  // URL에서 카테고리 받기
    Post.findAll({
        include: [{
            model: db.menu,
            where: { category: category }  // 카테고리 필터링
        }]
    }).then(posts => {
        res.render('categoryPosts', {  // 카테고리별 포스트 렌더링할 뷰
            posts: posts,
            category: category
        });
    }).catch(error => {
        console.error("Error fetching posts by category:", error);
        res.status(500).send("Error retrieving posts");
    });
};