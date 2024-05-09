// models/usage.js
// 사용
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Ingredient = require('./Ingredient');
const Menu = require('./Menu');

class Usage extends Model {}

Usage.init({
  ingredientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Ingredient,
      key: 'ingredientId'
    }
  },
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Menu,
      key: 'menuId'
    }
  }
}, {
  sequelize,
  modelName: 'usage'
});

module.exports = Usage;
