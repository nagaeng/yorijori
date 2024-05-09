module.exports = (sequelize, Sequelize) => {
  const post = sequelize.define('post', {
    postId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    content: Sequelize.TEXT,
    date: Sequelize.DATE,
    menuId: { type: Sequelize.INTEGER, allowNull: false },
    userId: { type: Sequelize.INTEGER, allowNull: false }
  }, 
  {
    timestamps: false
  });
  
  return post;
};