// models/menu.js
//메뉴
mudule.exports = (sequelize, Sequelize) =>{

class Menu extends Sequelize.Model {}

Menu.init({
  menuId: { //메뉴번호
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  menuName: { //메뉴명
    type: Sequelize.STRING,
    allowNull: false
  },
  cookTime: { //조리시간
    type: Sequelize.INTEGER,
    allowNull: true
  },
  category: { //카테고리(메뉴용)
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'menu'
});
return Menu;
}