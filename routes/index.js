var express = require('express');
var router = express.Router();
var usr = require('../db/dbConnect');


/* GET home page. */
router.get('/', function (req, res) {
  if (req.cookies.islogin) {
    req.session.islogin = req.cookies.islogin;
  }
  if (req.session.islogin) {
    res.locals.islogin = req.session.islogin;
  }
  res.render('index', { title: 'HOME', test: res.locals.islogin });
});




module.exports = router;