'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');

module.exports = (sequelize) => {
  class Book extends Model {};
  Book.init({
    title:{ 
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter a title"
        }
      }
    },
    author:{
      type: Sequelize.STRING,
      allowNull: false,
      validate:{
        notEmpty: {
          msg:"Please enter author's name"
        }
      }
    },
    genre: Sequelize.STRING,
    year: Sequelize.INTEGER,
  }, {
    sequelize,
    modelName: 'Book',
  });

  return Book;
};