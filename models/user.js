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

  class User extends Sequelize.Model{
    static async findByPkAndUpdate(id, params){
      let user = await User.findByPk(id);
      if(user){
        user = await User.update(params, {
          where: {id: id}
        });
      }
      return user;
    }
    static async findByAndRemove(id){
      let user = await User.findByPk(id);
      let (user){
        user = await User.destory({
          where: {id: id}
        });
      }
      return user; 
  }
};