module.exports = (sequelize, Sequelize) => {
  const user = sequelize.define('user', {
    userId: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    name: { type: Sequelize.STRING, allowNull: false },
    nickname: { type: Sequelize.STRING, allowNull: false },
    phoneNumber: { type: Sequelize.STRING, allowNull: false },
    addressId: { type: Sequelize.INTEGER, allowNull: false }
  }, 
  {
    timestamps: false
  });

  return user;
};