// models/ingredient.js
//재료
mudule.exports = (sequelize, Sequelize) =>{

class Ingredient extends Sequelize.Model {}

Ingredient.init({
  ingredientId: { //재료번호
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  ingredientName: { //재료명
    type: Sequelize.STRING,
    allowNull: false
  },
  category: { //카테코리(재료용)
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ingredient'
});
return Ingredient;
}