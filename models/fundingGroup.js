// models/fundingGroup.js
//펀딩그룹
mudule.exports = (sequelize, Sequelize) =>{
  const User = require("./user")(sequelize,Sequelize); 
  const Address = require("./address")(sequelize,Sequelize);
  const FundingProduct = require("./fundingProduct")(sequelize,Sequelize);

class FundingGroup extends Sequelize.Model {}

FundingGroup.init({
  fundingGroupId: { //펀딩그룹번호
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  addressId: {//주소번호(FK)
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: Address,
      key: 'addressId'
  }
  },
  fundingProductId: { //펀딩상품번호(FK)
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: FundingProduct,
      key: 'FundingProductId'
  }
  },
  deliveryDate: { //배송일자
    type: Sequelize.DATE,
    allowNull: true
  },
  deliveryStatus: { //배송여부
    type: Sequelize.STRING,
    allowNull: true
  },
  deliveryCost: { //배송비
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0
  },
  representativeUserId: { //대표자의 사용자번호(FK)
    type: Sequelize.INTEGER,
    allowNull: false,
    references:{
      model: User,
      key: 'UserId'
  }
  }
}, {
  sequelize,
  modelName: 'fundingGroup'
});
return FundingGroup;
}
