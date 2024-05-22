const { Op } = require('sequelize');
const db = require('../models');
const Post = db.post;

exports.searchResult = async (req, res) => {
    try {
        const material = req.query.material; // 검색어 읽기
        // 검색 결과 게시물을 담을 배열
        let filteredPosts = [];
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
                            '$menu.ingredients.ingredientName$': {
                                [Op.like]: `%${material}%`
                            }
                        }
                    ]
                },
                include: [{
                    model: db.menu,
                    include: [{
                        model: db.ingredient,
                        through: { attributes: [] }
                    }]
                }]
            });
        }

        // 필터링된 포스트의 모든 재료 가져오기
        const postIds = filteredPosts.map(post => post.postId); // 'id' 대신 'postId' 사용

        const posts = await Post.findAll({
            where: { postId: postIds }, // 'id' 대신 'postId' 사용
            include: [
                {
                    model: db.menu,
                    include: [{
                        model: db.ingredient,
                        through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
                    }]
                }
            ]
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.menu.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        // 검색 결과 페이지 렌더링
        res.render('recipe/searchResult', {
            result_posts: postsWithIngredients,
            searchQuery: material
        });
    } catch (err) {
        console.error("Error rendering search page:", err);
        res.status(500).send({
            message: "Error rendering search page"
        });
    }
};
