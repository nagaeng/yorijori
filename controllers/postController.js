const db= require("../models/index"),
Post = db.post,
Op = db.Sequelize.Op;

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await db.post.findAll({
            include: [{
                model: db.menu,
                include: [{
                    model: db.ingredient,
                    through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
                }]
            }]
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.menu.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        res.render("recipe/posts", {
            posts: postsWithIngredients,
            showCategoryBar: true
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({
            message: err.message
        });
    }
};

exports.getPostsByCategory = async (req, res) => {
    const category = req.params.category; // URL에서 카테고리 받기

    try {
        const posts = await Post.findAll({
            include: [{
                model: db.menu,
                where: { category: category }, // 카테고리 필터링
                include: [{
                    model: db.ingredient,
                    through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
                }]
            }]
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.menu.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        res.render('recipe/categoryPosts', { // 카테고리별 포스트 렌더링할 뷰
            posts: postsWithIngredients,
            category: category,
            showCategoryBar: true
        });

    } catch (error) {
        console.error("Error fetching posts by category:", error);
        res.status(500).send("Error retrieving posts");
    }
};

exports.getPostsBySubcategory = async (req, res) => {
    const { category, subcategory } = req.params; // URL에서 메인 카테고리와 세부 카테고리 받기

    try {
        let ingredientCategoryCondition = {};
        if (subcategory !== 'all') {
            ingredientCategoryCondition.category = subcategory; // 세부 카테고리로 필터링
        }

        const posts = await db.post.findAll({
            include: [{
                model: db.menu,
                where: { category: category }, // 메인 카테고리로 필터링
                include: [{
                    model: db.ingredient,
                    where: ingredientCategoryCondition,
                    through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
                }]
            }]
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.menu.ingredients.map(ingredient => ingredient.category).join(', ')
        }));

        res.render('recipe/subCategoryPosts', { // 세부 카테고리별 포스트 렌더링할 뷰
            posts: postsWithIngredients,
            category: category,
            subcategory: subcategory,
            showCategoryBar: true,
            showSubCategoryBar: true
        });

    } catch (error) {
        console.error("Error fetching posts by subcategory:", error);
        res.status(500).send("Error retrieving posts");
    }
};

/*
exports.getPostsBySubcategory = async (req, res) => {
    const { category, subcategory } = req.params; // URL에서 메인 카테고리와 세부 카테고리 받기

    try {
        const posts = await db.post.findAll({
            include: [{
                model: db.menu,
                where: { category: category }, // 메인 카테고리로 필터링
                include: [{
                    model: db.ingredient,
                    where: { ingredientName: subcategory }, // 세부 카테고리로 필터링
                    through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
                }]
            }]
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.menu.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        res.render('subcategoryPosts', { // 세부 카테고리별 포스트 렌더링할 뷰
            posts: postsWithIngredients,
            category: category,
            subcategory: subcategory,
            showCategoryBar: true,
            showSubCategoryBar: true
        });

    } catch (error) {
        console.error("Error fetching posts by subcategory:", error);
        res.status(500).send("Error retrieving posts");
    }
};
*/