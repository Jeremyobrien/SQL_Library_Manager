var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { sequelize } = require("./models");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var booksRouter = require('./routes/books');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/static", express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// app.use('/users', usersRouter);
// app.use("/books", booksRouter);

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Successfully connected to the database');
  } catch(error) {
    console.log('Unable to connect to the database: ', error);
  }
})();

// catch 404 and forward to error handler

app.all('*', (req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = "The page you requested cannot be found."
  next(err);
});

// app.use(function(req, res, next) {
//   next(createError(404));
// });

//global error handler
app.use(function(err, req, res, next) {
  if (err){
    console.log("Global error handler called");
  }
  if (err.status === 404){
    res.status(err.status).render('page_not_found', { err });
    }
  else {
      err.message = err.message || "Server Error. Please try again."
      res.status(err.status || 500).render('error', { err })
    }
    console.error(err.status, err.message);
})

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
