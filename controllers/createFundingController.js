const db = require("../models/index"),
    FundingProduct = db.fundingProduct,
    FundingGroup = db.fundingGroup,
    User = db.user,
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' };
    const formattedDate = date.toLocaleDateString('ko-KR', options);
    
    // Format the date as YYYY/MM/DD (day)
    const [year, month, day] = formattedDate.split('. ');
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toLowerCase();
    return `${year}/${month}/${day} (${dayOfWeek})`;
}

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
            
            // Format the expirationDate for each result
            results.forEach(result => {
                result.formattedExpirationDate = formatDate(result.expirationDate);
            });

            console.log(results);

            res.render("funding/searchResults", { results, query });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

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
            let [product] = await sequelize.query(sql, { type: Sequelize.SELECT });

            if (product && product.length > 0) {
                product[0].formattedExpirationDate = formatDate(product[0].expirationDate);
            }

            res.render("funding/productDetail", { product: product[0] });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    showCreateFundingPage: async (req, res) => {
        try {
            console.log("showCreateFundingPage function called");
            let productId = req.params.productId;
            console.log(`productId: ${productId}`);

            let productQuery = `SELECT 
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
            let userQuery = `SELECT 
                                userId, 
                                email, 
                                name, 
                                nickname, 
                                phoneNumber, 
                                city, 
                                district, 
                                town, 
                                detail 
                            FROM 
                                users 
                            WHERE 
                                userId = ?`;

            let [product] = await sequelize.query(productQuery, {
                replacements: [productId],
                type: Sequelize.SELECT
            });
            
            let [representative] = await sequelize.query(userQuery, {
                replacements: [req.user.userId],
                type: Sequelize.SELECT
            });

            if (product && product.length > 0) {
                product[0].formattedExpirationDate = formatDate(product[0].expirationDate);
            }

            res.render("funding/createFunding", { product: product[0], representative: representative[0] });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    createFunding: async (req, res) => {
        try {
            let productId = req.params.productId;
            let { deliveryDate, city, district, town, detail, people, distributionDate } = req.body;
            let fundingDate = new Date();

            let newFundingGroup = await FundingGroup.create({
                fundingProductId: productId,
                deliveryDate,
                fundingDate,
                city,
                district,
                town,
                detail,
                distributionDate,
                people,
                representativeUserId: req.user.userId
            });

            res.redirect(`/create_funding_success/${newFundingGroup.fundingGroupId}`);
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    showCreateFundingSuccessPage: async (req, res) => {
        try {
            let fundingGroupId = req.params.fundingGroupId;
            let fundingGroup = await FundingGroup.findByPk(fundingGroupId);

            res.render("funding/createFundingSuccess", { fundingGroup });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    }
};