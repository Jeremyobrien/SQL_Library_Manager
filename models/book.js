'use strict';
// const {
//   Model
// } = require('sequelize');

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Book extends Sequelize.Model {

  }
  Book.init({
    title:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        msg:"Please enter a title"
      }
    },
    author:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        msg:"Please enter author's name"
      }
    },
    genre: DataTypes.STRING,
    year: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Book'
  });

  return Book;
};