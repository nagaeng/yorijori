// // const fundingGroup = require("../models/fundingGroup"); //뭐냐얘?왜있더라
// const Sequelize = require('sequelize');;

const db = require("../models/index"),
    fundingProduct = db.fundingProduct,
    fundingGroup = db.fundingGroup,
    user = db.user,
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

module.exports = {
    getFundingPage: async (req, res) => { //펀딩그룹모집중인 목록 보여주는 처음페이지
        try {
            const query = `SELECT  //findAll()로 했더니 원하는 결과가 안나와서 raw 쿼리 사용함. 펀딩그룹을 기준으로 펀딩상품과 유저 테이블을 조인해서 정보가져옴.
                                fundingProducts.productName,
                                fundingProducts.unitPrice,
                                fundingProducts.quantity,
                                users.name
                            FROM
                                fundingGroups
                            LEFT JOIN
                                fundingProducts ON fundingGroups.fundingProductId = fundingProducts.fundingProductId
                            LEFT JOIN
                                users ON fundingGroups.representativeUserId = users.userId;`
            const products = await sequelize.query(query, { type: Sequelize.SELECT });

            res.render('funding/fundingPage', { products: products[0] }); //products안에 동일한 객체 2개가 배열로 이루어져있어서 첫번째 객체만 출력하게함.

        } catch (error) {
            res.status(500).send({message: error.message});
            console.error(`Error: ${error.message}`);
        }
    },
    getJoinFunding: (req, res) => { //참여할 펀딩선택했을때 선택한 펀딩에 대한 정보 보여주기
        try{
            const query = `SELECT  
                                funding
                                fundingProducts.productName,
                                fundingProducts.unitPrice,
                                fundingProducts.quantity,
                                users.name
                            FROM
                                fundingGroups
                            LEFT JOIN
                                fundingProducts ON fundingGroups.fundingProductId = fundingProducts.fundingProductId
                            LEFT JOIN
                                users ON fundingGroups.representativeUserId = users.userId;`
            // const data = await sequelize.query(query, { type: Sequelize.SELECT });
            res.render("funding/joinFunding");
        }catch (error) {
            res.status(500).send({message: error.message});
            console.error(`Error: ${error.message}`);
        }

    },
    getJoinFundingClick: (req, res) => { //펀딩 참여눌렀을 때 확인페이지
        res.render("funding/joinFundingClick");
    },
    getJoinFundingComplete: (req, res) => { //참여완료하고 알림?정보 보여주는 페이지
        res.render("funding/joinFundingComplete");
    }

}