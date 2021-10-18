'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      user.hasOne(models.profile, {
        as: "profile",
        foreignKey: {
          name: "idUser",
        }
      });
      user.hasOne(models.transaction, {
        as: "transaction",
        foreignKey: {
          name: "idUser"
        }
      });
      user.hasMany(models.books, {
        as: "books",
        foreignKey: {
          name: "idUser",
        }
      });
      user.hasMany(models.transaction, {
        as: "transactions",
        foreignKey: {
          name: "idUser",
        }
      });
      user.belongsToMany(models.books, {
        as: "userBookLists",
        through: {
          model: "userBookList",
          as: "bridge",
        },
        foreignKey: "idUser",
      });
      user.hasMany(models.chats, {
        as: "senderMessage",
        foreignKey: {
          name: "idSender",
        },
      });
      user.hasMany(models.chats, {
        as: "recipientMessage",
        foreignKey: {
          name: "idRecipient"
        },
      });
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return user;
};