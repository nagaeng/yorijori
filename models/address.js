// models/address.js
//주소
mudule.exports = (sequelize, Sequelize) =>{
}

class Address extends Model {}

Address.init({
  addressId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  district: {
    type: DataTypes.STRING,
    allowNull: false
  },
  town: {
    type: DataTypes.STRING,
    allowNull: false
  },
  detail: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'address'
});

module.exports = Address;
