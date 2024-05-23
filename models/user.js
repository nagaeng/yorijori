const { Sequelize, Model } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize, Sequelize) => {
  class User extends Model {
    // id로 찾아서 업데이트하는 메서드
    static async findByPkAndUpdate(id, params) {
      let user = await User.findByPk(id);
      if (user) {
        await User.update(params, {
          where: { id: id }
        });
        user = await User.findByPk(id); // 업데이트 후 최신 상태로 다시 가져옵니다.
      }
      return user;
    }

    // id로 찾아서 삭제하는 메서드
    // static async findByPkAndRemove(id) {
    //   let user = await User.findByPk(id);
    //   if (user) {
    //     await User.destroy({
    //       where: { id: id }
    //     });
    //   }
    //   return user;
    // }
    // passwordComparison = (inputPassword) => {
    //   let user = this;
    //   return bcrypt.compare(inputPassword, user.password);
    // }
  }

  User.init({
    userId: { // 사용자번호
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: { // 이메일
      type: Sequelize.STRING,
      allowNull: false
    },
    password: { // 비밀번호
      type: Sequelize.STRING,
      allowNull: false
    },
    name: { // 이름
      type: Sequelize.STRING,
      allowNull: false
    },
    nickname: { // 별명
      type: Sequelize.STRING,
      allowNull: false
    },
    phoneNumber: { // 전화번호
      type: Sequelize.STRING,
      allowNull: false
    },
    city: { // 시도
      type: Sequelize.STRING,
      allowNull: false
    },
    district: { // 시군구
      type: Sequelize.STRING,
      allowNull: false
    },
    town: { // 읍면동
      type: Sequelize.STRING,
      allowNull: false
    },
    detail: { // 상세주소
      type: Sequelize.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  },
  {
    hooks: {
      beforeSave: async (user) => {
        let hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
      }
    }
  });
  
  return user;
};
