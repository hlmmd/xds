var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var LoginRouter = require('./routes/login');
var regRouter = require('./routes/reg');

var xdsRouter = require('./routes/xds')
var studentRouter = require('./routes/student')
//add
var session = require('express-session');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//modify
//app.use(cookieParser());

app.use(cookieParser("An"));

//需要添加的
app.use(session({
  secret: 'an',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/', LoginRouter);
app.use('/', regRouter);
app.use('/', xdsRouter);
app.use('/', studentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

global.systemtitle = '选调生管理系统';


module.exports = app;