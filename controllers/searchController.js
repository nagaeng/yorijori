const { Op, Sequelize } = require('sequelize');
const db = require('../models');
const Post = db.post;

exports.searchResult = async (req, res) => {
    try {
        const material = req.query.material; // 검색어 읽기
        const sort = req.query.sort; // 정렬 방법 읽기
        let order =  [[db.view, 'views', 'DESC']]; // 디폴트 정렬 방법 popularity 조회수 따라

         // 값에 따라 정렬 방법 선택
         if (sort === 'latest') {
            order = [['date', 'DESC']]; // 최신순
        } else if (sort === 'oldest') {
            order = [['date', 'ASC']]; // 과거순
        } else if (sort === 'comments') {
            order = [Sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = post.postId)'), 'DESC']; // 댓글 많은 순
        }

        let filteredPosts = []; // 검색 결과 게시물을 담을 배열
        // 검색어와 일치하는 포스트 찾기
        if (material && material.trim() !== "") {
            filteredPosts = await Post.findAll({
                where: {
                    [Op.or]: [
                        {
                            title: {
                                [Op.like]: `%${material}%`
                            }
                        },
                        {
                            '$ingredients.ingredientName$': {
                                [Op.like]: `%${material}%`
                            }
                        }
                    ]
                },
                include: [{
                    model: db.ingredient,
                    attributes: [] 
                }],
            });
        }

        // 필터링된 포스트의 모든 재료 가져오기
        const postIds = filteredPosts.map(post => post.postId); // 'id' 대신 'postId' 사용

        const posts = await Post.findAll({
            where: { postId: postIds }, // 'id' 대신 'postId' 사용
            include: [
                {
                    model: db.ingredient,
                    through: { attributes: []}
                },
                {
                    model: db.view,
                    attributes: ['views'] // Fetch the views attribute
                 },
                 {
                    model: db.comment,
                    attributes: [] 
                }
            ],                
            order: [order],
            
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        // 검색 결과 페이지 렌더링
        res.render('recipe/searchResult', {
            result_posts: postsWithIngredients,
            searchQuery: material,
            sort: sort
        });
    } catch (err) {
        console.error("Error rendering search page:", err);
        res.status(500).send({
            message: "Error rendering search page"
        });
    }
};
