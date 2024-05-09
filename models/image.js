// models/image.js
//이미지
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../sequelize');
const Post = require('./Post');

class Image extends Model {}

Image.init({
  imageId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false
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
  modelName: 'image'
});

module.exports = Image;
