// models/ㅍiew.js
// 조회
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Post = require('./Post');

class View extends Model {}

View.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  postId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'postId'
    }
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'view'
});

module.exports = View;
