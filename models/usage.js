// models/usage.js
// 사용

module.exports = (sequelize, Sequelize) =>{
  const Ingredient = require("./ingredient")(sequelize,Sequelize); 
  const Menu = require("./menu")(sequelize,Sequelize); 

class Usage extends Sequelize.Model {}

Usage.init({
  ingredientId: { //재료번호(FK)
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Ingredient,
      key: 'ingredientId'
    }
  },
  menuId: { //메뉴번호(FK)
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Menu,
      key: 'menuId'
    }
  }
}, {
  sequelize,
  modelName: 'usage',
  timestamps: false
});

return Usage;
}