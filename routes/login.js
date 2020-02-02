
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');
var crypto = require('crypto');

var bcrypt = require('bcrypt');


function cryptPwd(password) {
    const saltRounds = 10; //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds); //获取hash值
    var hash = bcrypt.hashSync(password, salt);
    return hash;
    // var md5 = crypto.createHash('md5');
    // return md5.update(password).digest('hex');
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

        console.log(cryptPwd('tongji'));

        if (myutil.checklogin(req, res) == true) {
            return res.redirect('/home');
        }
        //检查用户名是否为空，或者是否可能发生sql注入
        if (req.body.username == '' || req.body.username != myutil.stripscript(req.body.username)) {
            return res.render('login', { title: global.systemtitle, errmsg: '用户名或密码错误!' });
        }
        result = null;
        usr.loginFun(req.body.username, function (result) {
            if (result !== undefined && result.length == 1
                && bcrypt.compareSync(req.body.password, result[0].password)) {
                req.session.islogin = req.body.username;
                res.locals.islogin = req.session.islogin;
                //100分钟后cookie清空,maxAge单位ms
                var maxage = 600000;
                res.cookie('islogin', res.locals.islogin, { maxAge: maxage });
                res.cookie('type', result[0].type, { maxAge: maxage });
                res.cookie('user_id', result[0].id, { maxAge: maxage });
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

//关于
router.get('/about', function (req, res) {
    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }
    else {
        return res.render('about', {
            title: global.systemtitle,
            user: res.locals.islogin,
            user_id: req.cookies.user_id,
            type: req.cookies.type,
            navbar_active: 'about'
        });
    }
});


router.get('/home', function (req, res) {

    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }
    else if (myutil.checklogin_student(req, res)) {
        result = null;
        usr.commentFun(req.cookies.user_id, function (result) {

            for (i = 0; i < result.length; i++) {
                result[i].timestamp = myutil.Datetoyyyymmdd(result[i].timestamp);
            }
            return res.render('home', {
                title: global.systemtitle,
                user: res.locals.islogin,
                user_id: req.cookies.user_id,
                type: req.cookies.type,
                navbar_active: 'home',
                comments: result
            });
        });
    }
    else {
        result = null;
        usr.commentFun(0, function (result) {

            for (i = 0; i < result.length; i++) {
                result[i].timestamp = myutil.Datetoyyyymmdd(result[i].timestamp);
            }

            return res.render('home', {
                title: global.systemtitle,
                user: res.locals.islogin,
                user_id: req.cookies.user_id,
                type: req.cookies.type,
                navbar_active: 'home',
                comments: result
            });
        });
    }

});



router.post('/addcomment', function (req, res) {

    if (myutil.checklogin_student(req, res) == false || isNaN(req.query.user_id)
        || req.query.user_id == ' ') {
        return res.redirect('/');
    }
    else {

        usr.addcommentFun(req.query.user_id, req.body, function (result) {
            return res.redirect('/home');
        });

    }
});


router.get('/dealcomment', function (req, res) {

    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else if (isNaN(req.query.user_id) || req.query.user_id == ' '
        || isNaN(req.query.comment_id) || req.query.comment_id == ' ') {
        return res.redirect('/');
    }
    else {
        usr.dealcommentFun(req.query.user_id, req.query.comment_id, function (err) {
            return res.redirect('/home');
        });
    }

});

router.post('/delcomment', function (req, res) {

    if (myutil.checklogin_admin(req, res) == true) {
        usr.delcommentFun(0, req.body.comment_id, function (err) {
            return res.redirect('/home');
        });
    }
    else if (myutil.checklogin_student(req, res) == false) {
        return res.redirect('/');
    }
    else {
        usr.delcommentFun(req.cookies.user_id, req.body.comment_id, function (err) {
            return res.redirect('/home');
        });
    }
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
            if (result !== undefined && bcrypt.compareSync(req.body.oldpassword, result[0].password)) {
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
