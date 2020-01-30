
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

        years = null;
        usr.eventyearsFun(function (years) {
            //req.query未定义，说明是尚未查询，直接渲染
            if (req.query.year === undefined && req.query.province === undefined) {
                return res.render('event', {
                    title: global.systemtitle,
                    navbar_active: 'event',
                    years: years,
                    provinces: global.provinces
                });
            }
            else if (isNaN(req.query.year) || isNaN(req.query.province)) {
                //已经查询，Url不合法，跳转到/event
                return res.redirect('/event');
            }
            else {
                //合法查询
                result = null;
                usr.eventFun(req.query.year, req.query.province, function (result) {
                    for (i = 0; i < result.length; i++)
                        result[i].start_date = myutil.Datetoyyyymmdd(result[i].start_date);

                    return res.render('event', {
                        title: global.systemtitle,
                        years: years,
                        navbar_active: 'event',
                        provinces: global.provinces,
                        events: result,
                        year: req.query.year,
                        province_id: req.query.province
                    });
                });
            }
        });

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
    else if (req.body.title == '' || isNaN(req.body.province)
        || req.body.province == '') {

        return res.render('addevent', {
            title: global.systemtitle,
            provinces: global.provinces,
            navbar_active: 'event',
            errmsg: '添加失败，请检查输入'
        });

    }

    else {
        var dt = new Date(req.body.start_date);
        year = dt.getFullYear();
        //硬编码检查输入的年份
        if (year >= 2100 || year < 1980) {
            return res.render('addevent', {
                title: global.systemtitle,
                provinces: global.provinces,
                navbar_active: 'event',
                errmsg: '添加失败，请检查输入'
            });
        }
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

            photofile = '/event_photo/' + req.files[0].filename +
                (suffix == '' ? '' : ('.' + suffix));;

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

        usr.eventdetailFun(req.query.event_id, function (result) {
            if (result !== undefined && result.length == 1) {
                result[0].start_date = myutil.Datetoyyyymmdd(result[0].start_date);

                usr.eventfileFun(req.query.event_id, function (fresult) {
                    if (fresult !== undefined && fresult.length > 0) {

                        return res.render('event_detail', {
                            title: global.systemtitle,
                            provinces: global.provinces,
                            detail: result[0],
                            eventfiles: fresult,
                            navbar_active: 'event'
                        });
                    }
                    else {
                        return res.render('event_detail', {
                            title: global.systemtitle,
                            provinces: global.provinces,
                            detail: result[0],
                            navbar_active: 'event'
                        });
                    }
                });


            }
            else {
                return res.render('event_detail', {
                    title: global.systemtitle,
                    provinces: global.provinces,
                    navbar_active: 'event',
                    errmsg: '事件不存在'
                });
            }

        });


    }
});


//上传文件，主要用到multer模块和fs模块。
router.post('/eventphoto', filemulter.any(), function (req, res, next) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.query.event_id)
        || (req.query.event_id == '')) {
        return res.redirect('/');
    }
    else {
        var photofile = '';
        if (req.files.length != 0) {


            var oname = req.files[0].originalname.split('.');
            //获取上传文件后缀
            var suffix = oname.length > 0 ? oname[oname.length - 1] : '';
            if (suffix != 'png' && suffix != 'jpg' && suffix != 'gif' && suffix != 'jpeg') {
                fs.unlinkSync(req.files[0].path);
                return res.redirect('/event_detail?event_id=' + req.query.event_id);
            }

            //设置文件大小限制10M
            if (req.files[0].size > 10 * 1024 * 1024) {
                fs.unlinkSync(req.files[0].path);
                return res.redirect('/event_detail?event_id=' + req.query.event_id);
            }

            var des_file = 'public/event_photo/' + req.files[0].filename +
                (suffix == '' ? '' : ('.' + suffix));

            photofile = '/event_photo/' + req.files[0].filename +
                (suffix == '' ? '' : ('.' + suffix));;

            //通过rename 进行move
            fs.renameSync(req.files[0].path, des_file);
        }

        usr.eventphotoFun(req.query.event_id, photofile, function (result) {
            return res.redirect('/event_detail?event_id=' + req.query.event_id);
        });
    }
});

//修改事件的主题和描述
router.post('/updateevent', function (req, res, next) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.query.event_id)
        || (req.query.event_id == '')) {
        return res.redirect('/');
    }
    else {
        usr.updateeventFun(req.query.event_id, req.body, function (result) {
            return res.redirect('/event_detail?event_id=' + req.query.event_id);
        });
    }
});

//删除事件
router.post('/delevent', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.body.event_id)
        || (req.body.event_id == '')) {
        return res.redirect('/');
    }
    else {
        usr.deleventFun(req.body.event_id, function (result) {
            return res.redirect('/event');
        });
    }
});


//添加文件

router.post('/addfile', filemulter.any(), function (req, res, next) {
    if (myutil.checklogin_admin(req, res) == false
        || isNaN(req.query.event_id) || (req.query.event_id == '')) {
        return res.redirect('/');
    }
    else if (req.files.length == 0) {
        return res.redirect('/event_detail?event_id=' + req.query.event_id);
    }
    else {
        var des_file = 'files/' + req.files[0].filename;

        //通过rename 进行move
        fs.renameSync(req.files[0].path, des_file);

        usr.addfileFun(req.query.event_id, req.files[0].originalname, des_file, function (result) {
            return res.redirect('/event_detail?event_id=' + req.query.event_id);
        });
    }
});

//删除文件
router.post('/deleventfile', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.body.file_id)
        || (req.body.file_id == '')) {
        return res.redirect('/');
    }
    else {
        usr.deleventfile(req.body.file_id, function (result) {
            return res.redirect('/event');
        });
    }
});

//下载文件
router.post('/downloadfile', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else {
        res.download(req.body.filepath, req.body.filename);
        return;
    }
});

module.exports = router;