// models/composition.js
// 구성
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const FundingGroup = require('./FundingGroup');
const User = require('./User');

class Composition extends Model {}

Composition.init({
  fundingGroupId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: FundingGroup,
      key: 'fundingGroupId'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'composition'
});

module.exports = Composition;
