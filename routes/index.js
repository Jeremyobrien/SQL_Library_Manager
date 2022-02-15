var express = require('express');
var router = express.Router();
const Book = require('../models').Book;
const sequelize = require('sequelize');

function asyncHandler(cb) {
  return async (req, res, next) => {
    try {
      await cb(req, res, next);
    } catch (err) {
      // Forward error to the global error handler
      next(err);
    }
  }
}

/* GET home page. */
router.get('/', asyncHandler(async (req, res, next) => {
  try {
    res.redirect('/books');
  } catch (err) {
    next(err);
  }
}
));



  // router.get('/error', (req, res, next) =>{
  //   console.log('Custom error route called');
  //   const err = new Error();
  //   err.message = `500 Internal Server Error`;
  //   err.status = 500;
  //   throw err;
  // });



module.exports = router;
