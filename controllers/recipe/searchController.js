const db= require("../../models/index"),
Post = db.post,
Op = db.Sequelize.Op;

exports.searchResult = async (req, res) => {
    try {
        const material = req.query.material; // 검색어 읽기
        // 검색어와 일치하는 포스트 찾기
        let results = [];
        if (material && material.trim() !== "") {
            results = await Post.findAll({
                where: {
                    title: {
                        [Op.like]: `%${material.trim()}%`
                    }
                }
            });
        }
        // 검색 결과 페이지 렌더링
        res.render('recipe/searchResult', { result_posts: results, searchQuery: material});
    } catch (err) {
        console.error("Error rendering search page:", err);
        res.status(500).send({
            message: "Error rendering search page"
        });
    }
};