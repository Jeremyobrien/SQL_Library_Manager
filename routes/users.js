var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/users', function(req, res, next) {

  throw createError(500, "Server Error");
});

module.exports = router;
