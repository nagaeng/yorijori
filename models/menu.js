module.exports = (sequelize, Sequelize) => {
  const menu = sequelize.define('menu', {
    menuId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    menuName: Sequelize.STRING,
    cookingTime: Sequelize.INTEGER,
    category: Sequelize.STRING
  }, 
  {
    timestamps: false
  });

  return menu;
};