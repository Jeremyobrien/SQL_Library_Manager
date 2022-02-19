const createError = require('http-errors');
var express = require("express");
var router = express.Router();
const Book = require("../models").Book;

//Handle requests and pass them to global handler
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

//Get home page with database entries
  router.get('/', asyncHandler( async (req, res, next) => {
    const books = await Book.findAll();
      res.render('index', {books});
}));

//Get 'create' book page
router.get("/new", asyncHandler( async (req, res, next) => {
    res.render("new-book", {book:{}})
}));

//Add new book to database
router.post("/new", asyncHandler( async (req, res, next) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect(`/books`);
  } catch (error) {  
    if (error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      res.render('new-book', { book, errors: error.errors});
    } else {
      throw error;
    }
  }
}));


//Get specific book and/or edit details
router.get("/:id", asyncHandler( async (req, res, next) => {
    const book = await Book.findByPk(req.params.id);
    if (book){
      res.render("update-book", { book });
    } else {
      next(createError(404));
    }
}));

//Update specific book's information
router.post("/:id", asyncHandler( async (req, res, next) => {
    let book;
    try {
      book = await Book.findByPk(req.params.id)
      if (book){
        await book.update(req.body)
        res.redirect(`/books`);
      } else {
        next(createError(404));
      }
    } catch (error) {
      if(error.name === "SequelizeValidationError") {
        book = await Book.build(req.body);
        book.id = req.params.id; // make sure correct book gets updated
        res.render("update-book", { book, errors: error.errors})
      } else {
        throw error;
      }
    }     
}));

//Get specific book to delete
router.get("/:id/delete", asyncHandler( async (req, res, next) => {
      const book = await Book.findByPk(req.params.id);
      if (book) {
        res.render('update-book', {book})
      } else {
        next(createError(404));
      }
}))

//Delete specific book
router.post("/:id/delete", asyncHandler( async (req, res, next) => {
  const book = await Book.findByPk(req.params.id)
  if (book) {
    await book.destroy();
    res.redirect('/books');
  } else {
    next(createError(404));
  }
}));


module.exports = router;