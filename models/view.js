// models/ㅍiew.js
// 조회

mudule.exports = (sequelize, Sequelize) =>{
class View extends Sequelize.Model {}

View.init({
  userId: { //사용자번호(FK)
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'userId'
    }
  },
  postId: { //글번호(FK)
    primaryKey: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Post,
      key: 'postId'
    }
  },
  views: { //조회수
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {
  sequelize,
  modelName: 'view'
});

return View;
}