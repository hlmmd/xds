//验证码
var express = require('express');
var router = express.Router();

var myutil = require('./common/myutil')

/* GET home page. */
router.get('/captcha', function (req, res, next) {

    let captcha = myutil.createCode();
    req.session = captcha.text.toLowerCase();
    //保存到cookie 方便前端调用验证
    res.cookie('captcha', req.session);
    res.setHeader('Content-Type', 'image/svg+xml');
    res.write(String(captcha.data));
    res.end();
});

module.exports = router;