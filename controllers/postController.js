const db = require("../models/index"),
Post = db.post,
Op = db.Sequelize.Op;

// 많이 본 & 최신 게시글 (로그인 X)
exports.getNoLoginRecommendPosts = async (req, res) => {
    try {
        const posts = await db.post.findAll({
            include: [
              {
                model: db.ingredient,
                through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
              },
              {
                model: db.image,
                as: 'images'
              },
              {
                model: db.view,
                attributes: ['views'] // Fetch the views attribute
              }
            ],
            order: [[db.view, 'views', 'DESC'], ['date', 'DESC']] // 조회수, 작성일 기준 내림차순 정렬
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));
        
        res.render("recipe/noLoginRecommendPosts", {
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

// 많이 본 & 사용자 맞춤 추천 게시글 (로그인 O)
exports.getLoginRecommendPosts = async (req, res) => {
    const userId = req.user.userId; // 사용자 id 받아오기

    try {
        // 1. 많이 본 게시글 3개 가져오기
        const viewPosts = await db.post.findAll({
            include: [
                {
                    model: db.ingredient,
                    through: { attributes: [] }
                },
                {
                    model: db.image,
                    as: 'images'
                },
                {
                    model: db.view,
                    attributes: ['views']
                }
            ],
            order: [[db.view, 'views', 'DESC']]
            //limit: 3
        });

        const viewPostsWithIngredients = viewPosts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        // 2. 사용자가 클릭한 게시글 및 저장한 게시글 ID 조회
        const [viewedPosts, savedPosts] = await Promise.all([
            db.view.findAll({
                where: { userId },
                attributes: ['postId']
            }),
            db.save.findAll({
                where: { userId },
                attributes: ['postId']
            })
        ]);

        const savedPostIds = savedPosts.map(save => save.postId);
        const uniquePostIds = [...new Set([...viewedPosts.map(v => v.postId), ...savedPosts.map(s => s.postId)])];

        // 3. 추천 게시글 9개 가져오기
        let recommendPostsWithIngredients = [];
        if (uniquePostIds.length > 0) {
            const relatedPosts = await db.post.findAll({
                where: {
                    postId: { [Op.in]: uniquePostIds }
                },
                include: [{ model: db.menu }]
            });

            const relatedCategories = [...new Set(relatedPosts.map(post => post.menu.category))];
            const relatedTitles = [...new Set(relatedPosts.map(post => post.title.split(' ')).flat())];

            const recommendedPosts = await db.post.findAll({
                where: {
                    [Op.or]: [
                        {
                            menuId: {
                                [Op.in]: (await db.menu.findAll({
                                    where: { category: { [Op.in]: relatedCategories } },
                                    attributes: ['menuId']
                                })).map(menu => menu.menuId)
                            }
                        },
                        {
                            title: {
                                [Op.or]: relatedTitles.map(title => ({ [Op.like]: `%${title}%` }))
                            }
                        }
                    ],
                    postId: { [Op.notIn]: uniquePostIds } // 사용자가 보거나 저장하지 않은 게시글 중 추천
                },
                include: [
                    {
                        model: db.ingredient,
                        through: { attributes: [] }
                    },
                    {
                        model: db.image,
                        as: 'images'
                    },
                    {
                        model: db.view,
                        attributes: ['views']
                    }
                ],
                order: [[db.view, 'views', 'DESC'], ['date', 'DESC']]
                //limit: 9
            });

            recommendPostsWithIngredients = recommendedPosts.map(post => ({
                ...post.get({ plain: true }),
                ingredients: post.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
            }));
        }

        // 4. 결과 렌더링
        res.render("recipe/loginRecommendPosts", {
            viewPosts: viewPostsWithIngredients,
            recommendPosts: recommendPostsWithIngredients,
            savedPostIds,
            showCategoryBar: true,
            user: { userId } // 사용자 정보 추가
        });
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send({
            message: err.message
        });
    }
};

// 메인 카테고리별 게시글
exports.getPostsByCategory = async (req, res) => {
    const userId = req.user?.userId || ""; // 사용자 id 받아오기
    const category = req.params.category; // URL에서 카테고리 받기
    const sort = req.query.sort; // 정렬 방법 읽기

    // 디폴트 정렬 방법: 조회수 순 (popularity)
    let order = [[db.view, 'views', 'DESC']];

    // 정렬 방법 선택
    if (sort === 'latest') {
        order = [['date', 'DESC']]; // 최신순
    } else if (sort === 'oldest') {
        order = [['date', 'ASC']]; // 과거순
    } else if (sort === 'comments') {
        order = [Sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = post.postId)'), 'DESC']; // 댓글 많은 순
    }

    try {
        const posts = await Post.findAll({
            include: [
                {
                    model: db.menu,
                    where: { category: category } // 카테고리 필터링
                },
                {
                    model: db.ingredient,
                    through: { attributes: [] } // 'Usage' 테이블의 필드는 가져오지 않음
                },
                {
                    model: db.image,
                    as: 'images'
                },
                {
                    model: db.view,
                    attributes: ['views'] // Fetch the views attribute
                }
            ],
            order: order // 정렬 적용
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        // 사용자가 클릭한 게시글 및 저장한 게시글 ID 조회
        const savedPosts = await db.save.findAll({
            where: { userId },
            attributes: ['postId']
        });

        const savedPostIds = savedPosts.map(save => save.postId);

        res.render('recipe/categoryPosts', { // 카테고리별 포스트 렌더링할 뷰
            posts: postsWithIngredients,
            category: category,
            showCategoryBar: true,
            savedPostIds,
            user: { userId },
            sort: sort // 현재 정렬 방법 전달
        });

    } catch (error) {
        console.error("Error fetching posts by category:", error);
        res.status(500).send("Error retrieving posts");
    }
};

// 세부 카테고리별 게시글
exports.getPostsBySubcategory = async (req, res) => {
    const userId = req.user?.userId || ""; // 사용자 id 받아오기
    const { category, subcategory } = req.params; // URL에서 메인 카테고리와 세부 카테고리 받기
    const sort = req.query.sort; // 정렬 방법 읽기

    // 디폴트 정렬 방법: 조회수 순 (popularity)
    let order = [[db.view, 'views', 'DESC']];

    // 정렬 방법 선택
    if (sort === 'latest') {
        order = [['date', 'DESC']]; // 최신순
    } else if (sort === 'oldest') {
        order = [['date', 'ASC']]; // 과거순
    } else if (sort === 'comments') {
        order = [Sequelize.literal('(SELECT COUNT(*) FROM comments WHERE comments.postId = post.postId)'), 'DESC']; // 댓글 많은 순
    }

    try {
        const ingredientCategoryCondition = {};
        if (subcategory !== 'all') {
            ingredientCategoryCondition.category = subcategory; // 세부 카테고리로 필터링
        }

        const filteredPosts = await db.post.findAll({
            include: [
                {
                    model: db.menu,
                    where: { category: category } // 메인 카테고리로 필터링
                },
                {
                    model: db.ingredient,
                    where: subcategory !== 'all' ? { category: subcategory } : {}, // 세부 카테고리로 필터링
                    through: { attributes: [] } // usage 테이블을 통해 연결됨
                },
                {
                    model: db.image,
                    as: 'images'
                }
            ],
        });

        // 필터링된 포스트의 모든 재료 가져오기
        const postIds = filteredPosts.map(post => post.postId);

        const posts = await db.post.findAll({
            where: { postId: postIds },
            include: [
                {
                    model: db.ingredient,
                    through: { attributes: [] }
                },
                {
                    model: db.image,
                    as: 'images'
                },
                {
                    model: db.view,
                    attributes: ['views'] // Fetch the views attribute
                }
            ],
            order: order // 정렬 적용
        });

        const postsWithIngredients = posts.map(post => ({
            ...post.get({ plain: true }),
            ingredients: post.ingredients.map(ingredient => ingredient.ingredientName).join(', ')
        }));

        // 사용자가 클릭한 게시글 및 저장한 게시글 ID 조회
        const savedPosts = await db.save.findAll({
            where: { userId },
            attributes: ['postId']
        });

        const savedPostIds = savedPosts.map(save => save.postId);

        res.render('recipe/subCategoryPosts', { // 세부 카테고리별 포스트 렌더링할 뷰
            posts: postsWithIngredients,
            category: category,
            subcategory: subcategory,
            showCategoryBar: true,
            showSubCategoryBar: true,
            savedPostIds,
            user: { userId },
            sort: sort // 현재 정렬 방법 전달
        });


    } catch (error) {
        console.error("Error fetching posts by subcategory:", error);
        res.status(500).send("Error retrieving posts");
    }
};

exports.postSave = async (req, res) => {
    const { userId, postId } = req.body;

    try {
        await db.save.create({ userId, postId });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
};

exports.postUnsave = async (req, res) => {
    const { userId, postId } = req.body;

    try {
        await db.save.destroy({ where: { userId, postId } });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error: error.message });
    }
};