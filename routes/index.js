var express = require('express');
var router = express.Router();
const Book = require('../models').Book;


/* GET home page. */
router.get('/', async function(req, res, next) {
  return res.render('index', {title: 'Books'} );
  });


module.exports = router;
