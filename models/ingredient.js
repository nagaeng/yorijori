module.exports = (sequelize, Sequelize) => {
  const ingredient = sequelize.define('ingredient', {
    ingredientId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    ingredientName: Sequelize.STRING,
    category: Sequelize.STRING
  }, 
  {
    timestamps: false
  });

  return ingredient;
};