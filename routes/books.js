const createError = require('http-errors');
var express = require("express");
var router = express.Router();
const Book = require("../models").Book;


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

  router.get('/', asyncHandler( async (req, res, next) => {
    try {
      const books = await Book.findAll();
      res.render('index', { books });
    } catch (err) {
      next(err)
    }
}));

router.get("/new", asyncHandler( async (req, res, next) => {
  try {
    res.render("new_book", {book:{}})
  } catch (err) {
    next(err)
  }
}));

router.post("/new", asyncHandler( async (req, res, next) => {
  let book;
  try {
    book = await Book.create(req.body);
    res.redirect(`/books/${book.id}`);
  } catch (error) {
    if (error.name === "SequelizeValidationError"){
      book = await Book.build(req.body);
      res.render('new_book', { book, errors: error.errors});
    } else {
      throw error;
    }
  }
}));

router.get("/:id", asyncHandler(async (req, res, next) => {
    try{
      const book = await Book.findByPk(req.params.id);
      res.render('show_book', { book })
    } catch (err) {
      next(err)
    }
}));

router.post("/:id/edit", asyncHandler( async (req, res, next) => {
    try {
      const book = await Book.findByPk(req.params.id);
      res.render("update_book", { book });
    } catch (err) {
      next(err)
    }
}));

router.post("/:id/delete", asyncHandler( async (req, res, next) => {
  const book = await Book.findByPk(req.params.id);
  res.render('tester', {book})
}));


module.exports = router;