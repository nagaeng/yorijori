const db = require("../models/index"),
    FundingProduct = db.fundingProduct,
    FundingGroup = db.fundingGroup,
    User = db.user,
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

module.exports = {
    // 펀딩 검색 페이지를 렌더링
    showCreateFundingSearchPage: async (req, res) => {
        try {
            res.render("funding/createFundingSearch");
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    // 검색 결과를 렌더링
    searchProducts: async (req, res) => {
        try {
            let query = req.query.query;
            console.log(query);
            let sql = `SELECT 
                            fundingProductId, 
                            productName, 
                            seller, 
                            unitPrice, 
                            expirationDate, 
                            quantity, 
                            unit, 
                            registrationDate, 
                            imageUrl 
                        FROM 
                            fundingProducts 
                        WHERE 
                            productName LIKE ?`;
            let values = [`%${query}%`];
            
            let [results] = await sequelize.query(sql, {
                replacements: values,
                type: Sequelize.SELECT
            });
            
            console.log(results);

            res.render("funding/searchResults", { results, query });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    // 특정 상품의 세부 정보를 렌더링
    productDetail: async (req, res) => {
        try {
            let productId = req.params.productId;
            console.log(productId)
            let sql = `SELECT 
                            fundingProductId, 
                            productName, 
                            seller, 
                            unitPrice, 
                            expirationDate, 
                            quantity, 
                            unit, 
                            registrationDate, 
                            imageUrl 
                        FROM 
                            fundingProducts 
                        WHERE 
                            fundingProductId = ${productId}`;
            let [product, a] = await sequelize.query(sql, {type: Sequelize.SELECT});
            res.local
            // let [product] = await sequelize.query(sql, {
            //     replacements: [productId],
            //     type: Sequelize.QueryTypes.SELECT
            // });
            console.log(product);
            res.render("funding/productDetail", { product: product[0] });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    // 펀딩 생성 페이지를 렌더링
    showCreateFundingPage: async (req, res) => {
        try {
            let productId = req.params.productId;
            let sql = `SELECT 
                            fundingProductId, 
                            productName, 
                            seller, 
                            unitPrice, 
                            expirationDate, 
                            quantity, 
                            unit, 
                            registrationDate, 
                            imageUrl 
                        FROM 
                            fundingProducts 
                        WHERE 
                            fundingProductId = ?`;
            let [product] = await sequelize.query(sql, {
                replacements: [productId],
                type: Sequelize.QueryTypes.SELECT
            });

            res.render("funding/createFunding", { product: product[0] });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    // 펀딩을 생성하고 성공 페이지를 렌더링
    createFunding: async (req, res) => {
        try {
            let { productId, deliveryDate, fundingDate, city, district, town, detail, distributionDate, people, representativeUserId, deliveryCost } = req.body;
            
            let newFundingGroup = await FundingGroup.create({
                fundingProductId: productId,
                deliveryDate,
                deliveryStatus: false,
                deliveryCost,
                fundingDate,
                city,
                district,
                town,
                detail,
                distributionDate,
                people,
                representativeUserId
            });

            res.render("funding/createFundingSuccess", { fundingGroup: newFundingGroup });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    }
};
