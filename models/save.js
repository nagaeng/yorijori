// models/save.js
//저장
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const User = require('./User');
const Post = require('./Post');

class Save extends Model {}

Save.init({
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
  }
}, {
  sequelize,
  modelName: 'save'
});

module.exports = Save;
