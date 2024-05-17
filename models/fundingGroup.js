// models/fundingGroup.js
//펀딩그룹
module.exports = (sequelize, Sequelize) => {
  const User = require("./user")(sequelize, Sequelize);
  const FundingProduct = require("./fundingProduct")(sequelize, Sequelize);

  class FundingGroup extends Sequelize.Model { }

  FundingGroup.init({
    fundingGroupId: { //펀딩그룹번호
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    fundingProductId: { //펀딩상품번호(FK)
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: FundingProduct,
        key: 'fundingProductId'
      }
    },
    deliveryDate: { //배송일자
      type: Sequelize.DATE,
      allowNull: true
    },
    deliveryStatus: { //배송여부
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    deliveryCost: { //배송비
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    fundingDate: { //펀딩날짜 추가함
      type: Sequelize.DATE,
      allowNull: false
    },
    representativeUserId: { //대표자의 사용자번호(FK)
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'userId'
      }
    }
  }, {
    sequelize,
    modelName: 'fundingGroup',
    timestamps: false
  });
  return FundingGroup;
}
