'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userBookList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      userBookList.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "idUser",
        }
      });

      userBookList.belongsTo(models.books, {
        as: "books",
        foreignKey: {
          name: "idBook",
        }
      });
    }
  };
  userBookList.init({
    idUser: DataTypes.INTEGER,
    idBook: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'userBookList',
  });
  return userBookList;
};