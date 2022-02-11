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



module.exports = router;