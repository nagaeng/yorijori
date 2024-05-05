const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db= {};

let sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;


/*
db.user = require("./user.js")(sequelize, Sequelize);
db.menu = require('./menu.js')(sequelize, Sequelize);
db.ingredient = require('./ingredient.js')(sequelize, Sequelize);
db.post = require('./post.js')(sequelize, Sequelize);
db.image = require('./image.js')(sequelize, Sequelize);


// Menu and Posts (1:N)
db.menu.hasMany(db.post, { foreignKey: 'menuId' });
db.post.belongsTo(db.menu, { foreignKey: 'menuId' });

// Users and Addresses
db.user.belongsTo(db.address, { foreignKey: 'addressId' });
db.address.hasMany(db.user, { foreignKey: 'addressId' });

// Users and Posts
db.user.hasMany(db.post, { foreignKey: 'userId' });
db.post.belongsTo(db.user, { foreignKey: 'userId' });

// Posts and Comments
db.post.hasMany(db.comment, { foreignKey: 'postId' });
db.comment.belongsTo(db.post, { foreignKey: 'postId' });

// Posts and Images
db.post.hasOne(db.image, { foreignKey: 'postId' });
db.image.belongsTo(db.post, { foreignKey: 'postId' });

// Funding Groups and Funding Products
db.fundingGroup.belongsTo(db.fundingProduct, { foreignKey: 'productId' });
db.fundingProduct.hasMany(db.fundingGroup, { foreignKey: 'productId' });

// Funding Groups and Users (Leaders)
db.fundingGroup.belongsTo(db.user, { foreignKey: 'leaderUserId' });
db.user.hasMany(db.fundingGroup, { foreignKey: 'leaderUserId' });

// Menus and Ingredients (N:M)
db.menu.belongsToMany(db.ingredient, { through: 'Usage', foreignKey: 'menuId', otherKey: 'ingredientId' });
db.ingredient.belongsToMany(db.menu, { through: 'Usage', foreignKey: 'ingredientId', otherKey: 'menuId' });
*/

module.exports= db;