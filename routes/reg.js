var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

var crypto = require('crypto');

function cryptPwd(password) {
    var md5 = crypto.createHash('md5');
    return md5.update(password).digest('hex');
}

router.route('/reg')
    .get(function (req, res) {
        if(util.checklogin(req,res)==false)
            res.render('reg', { title: '注册' });
    })
    .post(function (req, res) {
        client = usr.connect();

        usr.regFun(client, req.body.username, cryptPwd(req.body.password2), function (err) {

            if (err) {
                return res.send('注册失败,用户名已经被占用');
                res.redirect('/reg');
                //  throw err;
            }
            else
                res.send('注册成功');
        });

        client.end(function (err) {
            // The connection is terminated now
        });

    });

module.exports = router;