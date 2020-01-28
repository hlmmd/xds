
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');

var fs = require('fs');
//上传文件使用
var multer = require('multer');
//上传的文件放在临时文件夹中
var filemulter = multer({ dest: './public/tmp/' });


router.get('/event', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else {
        return res.send('not finish yet');
    }
});

router.get('/addevent', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else {
        return res.render('addevent', {
            title: global.systemtitle,
            provinces: global.provinces,
            navbar_active: 'event'
        });
    }
});

router.post('/addevent', filemulter.any(), function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else if (isNaN(req.body.year) || req.body.year == ''
        || req.body.title == '' || isNaN(req.body.province)
        || req.body.province == '') {

        return res.render('addevent', {
            title: global.systemtitle,
            provinces: global.provinces,
            navbar_active: 'event',
            errmsg: '添加失败，请检查输入'
        });

    }
    //硬编码检查输入的年份
    else if (req.body.year >= 2100 || req.body.year < 1980) {
        return res.render('addevent', {
            title: global.systemtitle,
            provinces: global.provinces,
            navbar_active: 'event',
            errmsg: '添加失败，请检查输入'
        });
    }
    else {
        var photofile = '';
        if (req.files.length != 0) {

            var oname = req.files[0].originalname.split('.');
            //获取上传文件后缀
            var suffix = oname.length > 0 ? oname[oname.length - 1] : '';
            if (suffix != 'png' && suffix != 'jpg' && suffix != 'gif' && suffix != 'jpeg') {
                fs.unlinkSync(req.files[0].path);
                return res.redirect('/addevent');
            }

            //设置文件大小限制10M
            if (req.files[0].size > 10 * 1024 * 1024) {
                fs.unlinkSync(req.files[0].path);
                return res.redirect('/addevent');
            }

            var des_file = 'public/event_photo/' + req.files[0].filename +
                (suffix == '' ? '' : ('.' + suffix));

            photofile = des_file;

            //通过rename 进行move
            fs.renameSync(req.files[0].path, des_file);
        }
        result = null;
        usr.addeventFun(photofile, req.body, function (result) {
            if (result != undefined && isNaN(result.insertId) == false) {
                return res.redirect('/event_detail?event_id=' + result.insertId);
            }
            else return res.redirect('/addevent');
        });
    }
});

router.get('/event_detail', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else if (isNaN(req.query.event_id) || req.query.event_id == '') {
        return res.redirect('/');
    }
    else {

        return res.render('event_detail', {
            title: global.systemtitle,
            provinces: global.provinces,
            navbar_active: 'event'
        });
    }
});

module.exports = router;