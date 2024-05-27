//models/view.js
//사용자

module.exports = (sequelize, Sequelize) => {
  class User extends Sequelize.Model {
  };

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
      type: Sequelize.STRING(1024),
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
    ,
    // myhash: {
    //   type: Sequelize.STRING(1024)
    // },
    mysalt: {
      type: Sequelize.STRING
    }
  }, 
  {  
    sequelize,
    modelName: 'user',
    timestamps: false
  }
  );
  
  return User;
};

