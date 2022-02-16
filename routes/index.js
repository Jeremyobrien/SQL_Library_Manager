var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.redirect('/books');
});



  // router.get('/error', (req, res, next) =>{
  //   console.log('Custom error route called');
  //   const err = new Error();
  //   err.message = `500 Internal Server Error`;
  //   err.status = 500;
  //   throw err;
  // });



module.exports = router;
