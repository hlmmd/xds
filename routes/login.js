
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');
var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

//TODO
//注册功能
router.route('/reg')
    .get(function (req, res) {
        if (myutil.checklogin(req, res) == false)
            res.render('reg', { title: '注册' });
    })
    .post(function (req, res) {
        return res.send('not yet');
        usr.regFun(req.body.username, cryptPwd(req.body.password2), function (err) {
            if (err == null || err.message != '') {
                return res.send('注册失败,用户名已经被占用');
                //  throw err;
            }
            else
                res.send('注册成功');
        });

    });


router.route('/')
    .get(function (req, res) {
        if (myutil.checklogin(req, res) == true) {
            return res.redirect('/home');
        }
        else
            return res.render('login', {
                title: global.systemtitle,
                test: res.locals.islogin
            });
    })
    .post(function (req, res) {

        //检查用户名是否为空，或者是否可能发生sql注入
        if (req.body.username == '' || req.body.username != myutil.stripscript(req.body.username)) {
            return res.render('login', { title: global.systemtitle, errmsg: '用户名或密码错误!' });
        }
        result = null;
        usr.loginFun(req.body.username, function (result) {

            if (result !== undefined && result.length == 1
                && result[0].password === cryptPwd(req.body.password)) {
                req.session.islogin = req.body.username;
                res.locals.islogin = req.session.islogin;
                //100分钟后cookie清空,maxAge单位ms
                res.cookie('islogin', res.locals.islogin, { maxAge: 6000000 });
                res.cookie('type', result[0].type, { maxAge: 6000000 });
                res.redirect('/home');
            }
            else { //用户名不存在或者密码错误      
                res.render('login', {
                    title: global.systemtitle,
                    errmsg: '用户名或密码错误!'
                });
            }
        });
    });


router.get('/logout', function (req, res) {
    res.clearCookie('islogin');
    req.session.destroy();
    res.redirect('/');
});

router.get('/home', function (req, res) {

    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }
    else
        res.render('home', {
            title: global.systemtitle,
            user: res.locals.islogin,
            type: req.cookies.type,
            navbar_active: 'home'
        });
});


//修改密码
router.get('/password', function (req, res) {

    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }
    else
        res.render('password', {
            title: global.systemtitle,
            user: res.locals.islogin,
            type: req.cookies.type,
            navbar_active: 'password'
        });
});

router.post('/password', function (req, res) {
    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }
    else {
        if (req.body.password1 != req.body.password2 || req.body.password2.length < 6) {
            return res.redirect('/password');
        }
        
        //先检查原密码
        result = null;
        usr.loginFun(req.cookies.islogin, function (result) {
            if (result !== undefined && result[0].password === cryptPwd(req.body.oldpassword)) {
                usr.updatepasswordFun(req.cookies.islogin, cryptPwd(req.body.password2), function (err) {
                    return res.redirect('/logout');
                });
            }
            else { //用户名不存在或者密码错误      
                return res.render('password', {
                    title: global.systemtitle,
                    user: res.locals.islogin,
                    type: req.cookies.type,
                    navbar_active: 'password',
                    errmsg: '原密码错误'
                });
            }
        });

    }
});


module.exports = router;
