'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class books extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      books.belongsTo(models.users, {
        as: "user",
        foreignKey: {
          name: "idUser",
        }
      });

      books.belongsToMany(models.category, {
        as: "category",
        through: {
          model: "categorybooks",
          as: "bridge",
        },
        foreignKey: "idBook",
      });
      books.belongsToMany(models.users, {
        as: "userBooks",
        through: {
          model: "userBookList",
          as: "bridge",
        },
        foreignKey: "idBook",
      });
    }
  };
  books.init({
    title: DataTypes.STRING,
    publicationDate: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    author: DataTypes.STRING,
    isbn: DataTypes.INTEGER,
    about: DataTypes.TEXT,
    bookFile: DataTypes.STRING,
    idUser: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'books',
  });
  return books;
};