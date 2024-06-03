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
    
            let representative = await User.findOne({
                where: { userId: req.user.id }
            });
    
            if (product) {
                product.formattedExpirationDate = formatDate(product.expirationDate);
            }
    
            res.render("funding/createFundingPage", { product, representative });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },
    
    createFunding: async (req, res) => {
        try {
            let { productId, deliveryDate, city, district, town, detail, people, deliveryCost } = req.body;
            let fundingDate = new Date();
    
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
                distributionDate: fundingDate,
                people,
                representativeUserId: req.user.id
            });
    
            res.render("funding/createFundingSuccess", { fundingGroup: newFundingGroup });
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    }
};
