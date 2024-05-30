const db = require("../models/index"),
    FundingProduct = db.fundingProduct,
    FundingGroup = db.fundingGroup,
    User = db.user,
    Composition = db.composition,
    sequelize = db.sequelize,
    Sequelize = db.Sequelize;

// getAddress = group => {  
//     let address = `${group.city} ${group.district} ${group.town} ${group.detail}`;
//     return address;
// };

module.exports = {
    createFundingSearch: async (req, res, next) => {
        try {
            let query = req.query.query;
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
            let values = query ? [`%${query}%`] : ['%%'];
            
            let [results, metadata] = await sequelize.query(sql, {
                replacements: values,
                type: Sequelize.SELECT
            });

            res.locals.results = results;
            res.locals.query = query;
            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },
    
    getCreateFundingSearch: async (req, res) => {
        res.render("funding/createFundingSearch", { results: res.locals.results, query: res.locals.query });
    },

    productList: async (req, res, next) => {
        try {
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
                            fundingProducts`;
            let products = await sequelize.query(sql, { type: Sequelize.SELECT });

            res.locals.products = products;
            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    productDetail: async (req, res, next) => {
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
                type: Sequelize.SELECT
            });

            res.locals.product = product[0];
            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    getCreateFunding: async (req, res) => {
        res.render("funding/create_funding", { product: res.locals.product });
    },

    createFunding: async (req, res, next) => {
        try {
            let { productId, deliveryDate, fundingDate, city, district, town, detail, distributionDate, people, representativeUserId, deliveryCost } = req.body;
            
            let newFundingGroup = await db.fundingGroup.create({
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

            res.locals.newFundingGroup = newFundingGroup;
            next();
        } catch (error) {
            res.status(500).send({ message: error.message });
            console.error(`Error: ${error.message}`);
        }
    },

    createFundingSuccess: async (req, res) => {
        res.render("funding/create_funding_success", { fundingGroup: res.locals.newFundingGroup });
    }
};
