var express = require('express');
var router = express.Router();
const Book = require('../models').Book;

let literature;

/* GET home page. */
router.get('/', async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  literature = await Book.findAll()
                               .then(console.log(res))
                               .then(res => res.json());
  await res.render('index', {info: literature})
  });


module.exports = router;
