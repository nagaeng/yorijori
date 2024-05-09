// models/comment.js
//댓글
mudule.exports = (sequelize, Sequelize) =>{
const Post = require('./post');
const User = require('./user');

class Comment extends Sequelize.Model {}

Comment.init({
  commentId: { //댓글번호
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: { //내용
    type: Sequelize.TEXT,
    allowNull: false
  },
  createdAt: { //작성일자
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  postId: { //글번호(FK)
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: Post,
      key: 'postId'
    }
  },
  userId: { //사용자번호(FK)
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  }
}, {
  sequelize,
  modelName: 'comment'
});

return Comment;
}