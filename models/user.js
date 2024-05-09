// models/user.js
//사용자
mudule.exports = (sequelize, Sequelize) =>{
    const Address = require("./address")(sequelize,Sequelize); 
    class User extends Sequelize.Model {}

    User.init({
    userId: { // 사용자번호
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    email: { //이메일
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: { //비밀번호
        type: Sequelize.STRING,
        allowNull: false
    },
    name: { //이름
        type: Sequelize.STRING,
        allowNull: false
    },
    nickname: Sequelize.STRING, //별명
    phoneNumber: DataTypes.STRING, //전화번호
    addressId: { //주소번호(FK)
        type: Sequelize.STRING,
        allowNull: false,
        references:{
            model: Address,
            key: 'addressId'
        }
    }
    }, {
    sequelize,
    modelName: 'user'
    }); 
    return User;
};
