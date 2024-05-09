module.exports = (sequelize, Sequelize) => {
  const image = sequelize.define('image', {
    postId: { type: Sequelize.INTEGER, allowNull: false },
    imageId: { type: Sequelize.STRING, primaryKey: true },
    imageUrl: Sequelize.STRING
  }, 
  {
    timestamps: false
  });

  return image;
};