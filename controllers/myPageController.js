const db = require("../models/index"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

module.exports = {
    mypageMain: async (req, res) => {
        try {
            let userId = res.locals.currentUser.getDataValue('userId');
            let query = `
                 SELECT p.title, p.userId
                 FROM posts p
                 LEFT JOIN users u ON u.userId = p.userId
                 where u.userId = ${userId};     
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });
            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            let query2 = `
                 SELECT nickname, imageUrl
                 FROM users
                 where userId = ${userId};     
            `;
            let [results, metadata2] = await sequelize.query(query2, { type: Sequelize.SELECT });
            console.log(results);
            res.render("auth/mypage_main", { posts: myposts, result:results[0], userId:userId}); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    mypageScrap: async (req, res) => {
        try {
            let userId = res.locals.currentUser.getDataValue('userId');
            let query = `
                SELECT p.title, p.date
                FROM saves s
                LEFT join posts p on s.postId = p.postId
                where s.userId = ${userId};   
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });

             // Format the dates before rendering
             myposts.forEach(post => {
                const date = new Date(post.date);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                post.date = date.toLocaleDateString('en-US', options);
            });

            let query2 = `
                 SELECT nickname, imageUrl
                 FROM users
                 where userId = ${userId};     
            `;
            let [results, metadata2] = await sequelize.query(query2, { type: Sequelize.SELECT });

            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            res.render("auth/mypage_scrap", { posts: myposts, result:results[0], userId:userId }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
        
        
    },

    mypageComment: async (req, res) => {
        try {
            let userId = res.locals.currentUser.getDataValue('userId');
            let query = `
                        SELECT p.title, c.content, c.createdAt  
                        FROM comments c
                        left join posts p on p.postId= c.postId
                        where c.userId = ${userId};
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });

             // Format the dates before rendering
             myposts.forEach(post => {
                const date = new Date(post.createdAt);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                post.createdAt = date.toLocaleDateString('en-US', options);
            });

            let query2 = `
                 SELECT nickname, imageUrl
                 FROM users
                 where userId = ${userId};     
            `;
            let [results, metadata2] = await sequelize.query(query2, { type: Sequelize.SELECT });


            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            res.render("auth/mypage_comment", { posts: myposts, result:results[0], userId:userId }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    mypageMyFunding: async (req, res) => {
        try {
            let userId = res.locals.currentUser.getDataValue('userId');
            let query = `
                        SELECT fg.representativeUserId, fg.fundingDate, fp.productName, fg.people, fp.imageUrl
                        FROM fundingGroups AS fg
                        INNER JOIN fundingProducts AS fp ON fg.fundingProductId = fp.fundingProductId
                        where fg.representativeUserId = 1;
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });
            
            // Format the dates before rendering
            myposts.forEach(post => {
                const date = new Date(post.fundingDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                post.fundingDate = date.toLocaleDateString('en-US', options);
            });

            let query2 = `
                 SELECT nickname, imageUrl
                 FROM users
                 where userId = ${userId};     
            `;
            let [results, metadata2] = await sequelize.query(query2, { type: Sequelize.SELECT });


            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            res.render("auth/mypage_myfunding", { posts: myposts, result:results[0], userId:userId }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    mypageParticipatedFunding: async (req, res) => {
        try {
            let userId = res.locals.currentUser.getDataValue('userId');
            let query = `
                        SELECT cp.userId, cp.fundingGroupId, fg.fundingDate, fg.people, fp.productName, fp.imageUrl
                        FROM compositions AS cp
                        INNER JOIN fundingGroups AS fg ON cp.fundingGroupId = fg.fundingGroupId
                        INNER JOIN fundingProducts AS fp ON fg.fundingProductId = fp.fundingProductId
                        where cp.userId = 6;
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });

            // Format the dates before rendering
            myposts.forEach(post => {
                const date = new Date(post.fundingDate);
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                post.fundingDate = date.toLocaleDateString('en-US', options);
            });

            let query2 = `
                 SELECT nickname, imageUrl
                 FROM users
                 where userId = ${userId};     
            `;
            let [results, metadata2] = await sequelize.query(query2, { type: Sequelize.SELECT });


            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            res.render("auth/mypage_participatedfunding", { posts: myposts, result:results[0], userId:userId }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },
};
