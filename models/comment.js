// models/comment.js
//댓글
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');

class Comment extends Model {}

Comment.init({
  commentId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'comment'
});

module.exports = Comment;
