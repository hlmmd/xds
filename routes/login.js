
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

var user_type = {
    admin: 0,
    assist: 1,
    student: 2
};

function user_type_string(type) {
    if (type == user_type.admin)
        return '管理员';
    else if (type == user_type.assist)
        return '助管';
    else if (type == user_type.student)
        return '学生';
    else
        return null;
}

router.route('/')
    .get(function (req, res) {
        if (util.checklogin(req, res) == true) {
            res.render('home', { title: '选调生管理系统', user: res.locals.islogin, type: user_type_string(req.cookies.type) });
        }
        else
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
                    res.cookie('type', result[0].type);
                    res.redirect('/home');
                } else {
                    res.redirect('/');
                }
            }
        });
    });


router.get('/logout', function (req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function (req, res) {

    if (util.checklogin(req, res) == false) {
        res.send("未登录");
    }
    else
        res.render('home', { title: '选调生管理系统', user: res.locals.islogin, type: user_type_string(req.cookies.type) });
});

module.exports = router;
