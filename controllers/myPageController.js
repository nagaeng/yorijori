const db = require("../models/index"),
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

module.exports = {
    mypageMain: async (req, res) => {
        try {
            let query = `
                 SELECT p.title, p.userId
                 FROM posts p
                 LEFT JOIN users u ON u.userId = p.userId
                 where u.userId = 1;                
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });
            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            res.render("auth/mypage_main", { posts: myposts }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    mypageScrap: async (req, res) => {
        try {
            let query = `
                SELECT p.title, p.userId
                FROM posts p
                LEFT JOIN users u ON u.userId = p.userId
                WHERE u.userId = 1;
            `;
            let [myposts, metadata] = await sequelize.query(query, { type: Sequelize.SELECT });
            
            // 배열인지 확인
           // console.log("Query Results (Array Check):", Array.isArray(myposts)); // 배열인지 확인
            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
        
            res.render("auth/mypage_main", { posts: myposts }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
        
        
    },

    mypageComment: async (req, res) => {
        try {
            //정보 추가 필요 
            const query = `
                        SELECT c.content, c.createdAt  
                        FROM comments c
                        JOIN posts p ON c.postId = p.postId
                        WHERE p.userId = :userId;
            `;
            const [myposts, metadata] = await sequelize.query(query, { type: Sequelize.QueryTypes.SELECT });
            console.log("Query Results:", myposts); // 쿼리 결과를 콘솔에 출력
            res.render("auth/mypage_comment", { posts: myposts }); // 결과를 사용하여 페이지 렌더링
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },
};
