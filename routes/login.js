
var express = require('express');
var router = express.Router();
var usr = require('../db/dbConnect');

var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}


router.route('/login')
    .get(function (req, res) {
        if (req.session.islogin) {
            res.locals.islogin = req.session.islogin;
        }
        if (req.cookies.islogin) {
            req.session.islogin = req.cookies.islogin;
        }
        // res.send('登录');
        res.render('login', { title: '用户登录', test: res.locals.islogin });
    })
    .post(function (req, res) {
        client = usr.connect();
        result = null;
        usr.loginFun(client, req.body.username, function (result) {
            if (result[0] === undefined) {
                res.send('没有该用户');
            } else {
                if (result[0].password === cryptPwd(req.body.password)) {
                    req.session.islogin = req.body.username;
                    res.locals.islogin = req.session.islogin;
                    res.cookie('islogin', res.locals.islogin, { maxAge: 60000 });
                    res.redirect('/home');
                } else {
                    res.redirect('/login');
                }
            }
        });
    });

router.get('/logout', function (req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;
