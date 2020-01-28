var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


//var indexRouter = require('./routes/index');

var LoginRouter = require('./routes/login');

var xdsRouter = require('./routes/xds');
var studentRouter = require('./routes/student');

var databaseRouter = require('./routes/database');

var eventRouter = require('./routes/event');

//add
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

//添加session
app.use(session({
  secret: 'an',
  resave: false,
  saveUninitialized: true
}));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', LoginRouter);
app.use('/', xdsRouter);
app.use('/', studentRouter);
app.use('/', databaseRouter);
app.use('/', eventRouter);

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

//数据库用户名密码
global.databaseuser = 'root';
global.databasepassword = 'tj91database';


global.systemtitle = '选调生管理系统';
global.career_levels = ['办事员', '科员', '副科级', '正科级', '副处级',
  '正处级', '副厅级', '正厅级', '副部级', '正部级', '其他'];
global.provinces = ['北京市', '天津市', '上海市', '重庆市',
  '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
  '江苏省', '浙江省', '安徽省', '福建省', '江西省',
  '山东省', '河南省', '湖北省', '湖南省', '广东省',
  '海南省', '四川省', '贵州省', '云南省', '陕西省',
  '甘肃省', '青海省', '台湾省', '内蒙古自治区',
  '广西壮族自治区', '西藏自治区', '宁夏回族自治区',
  '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区'];

global.enablereg = true;



Array.prototype.contains = function (obj) {
  var index = this.length;
  while (index--) {
    if (this[index] === obj) {
      return true;
    }
  }
  return false;
}

module.exports = app;