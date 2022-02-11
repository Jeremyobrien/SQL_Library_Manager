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

router.get('/books', asyncHandler( async (req, res, next) => {
    try {
      const results = await Book.findAll();
      res.render('index', { results });
    } catch (err) {
      next(err)
    }
}));

router.get("/books/new", asyncHandler( async (req, res, next) => {
  try {
    res.render("new_book")
  } catch (err) {
    next(err)
  }
}));

router.post("books/new", asyncHandler( async (req, res, next) => {
  try {
    const book = await Book.create(req.body);
    res.redirect('/books', { book });
  } catch (err) {
    next(err)
  }
}));

router.get("/books/:id", asyncHandler(async (req, res, next) => {
    try{
      const results = await Book.findByPk(req.params.id);
      res.render('index', { results })
    } catch (err) {
      next(err)
    }
}));

router.post("/books/:id", asyncHandler( async (req, res, next) => {
    try {
      const book = await Book.findByPk(req.params.id);
      res.render("update_book", { book });
    } catch (err) {
      next(err)
    }
}));

router.post("/books/:id/delete", asyncHandler( async (req, res, next) => {

}));


  // router.get('/error', (req, res, next) =>{
  //   console.log('Custom error route called');
  //   const err = new Error();
  //   err.message = `500 Internal Server Error`;
  //   err.status = 500;
  //   throw err;
  // });



module.exports = router;
