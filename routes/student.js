var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');
var fs = require('fs');
//上传文件使用
var multer = require('multer');
//上传的文件放在临时文件夹中
var photomulter = multer({ dest: './public/tmp/' });

router.get('/student', function (req, res) {
    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }

    //初始学生信息查询页面
    if (req.query.student_id == undefined) {
        return res.render('student', {
            title: global.systemtitle,
            navbar_active: 'student'
        });
    }
    else if (isNaN(req.query.student_id) || req.query.student_id == '') {
        //查询不合法
        return res.redirect('/student');
    }
    else {
        result = null;
        usr.studentFun(req.query.student_id, function (result) {
            if (result != undefined && result[0] !== undefined) {
                result[0].province = myutil.getprovincename(result[0].province_id);

                //继续读取career信息
                cresult = null;
                usr.careerFun(req.query.student_id, function (cresult) {
                    for (i = 0; i < cresult.length; i++) {
                        cresult[i].start_time = myutil.Datetoyyyymmdd(cresult[i].start_time);
                        cresult[i].end_time = myutil.Datetoyyyymmdd(cresult[i].end_time);
                    }
                    return res.render('student', {
                        title: global.systemtitle,
                        navbar_active: 'student',
                        stu_info: result[0],
                        careers: cresult,
                        career_levels: global.career_levels
                    });
                });
            }
            else {
                return res.render('student', {
                    title: global.systemtitle,
                    navbar_active: 'student',
                    notfound: '未找到'
                });
            }
        });
    }
});




//修改学生信息
router.post('/student', function (req, res) {
    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }

    if (isNaN(req.query.student_id) || req.query.student_id == '') {
        return res.redirect('/student');
    }
    //name sql注入检查
    if (req.body.info_name != myutil.stripscript(req.body.info_name)) {
        //TODO 渲染错误提示，非法字符
        return res.redirect('/student');
    }
    //year检查
    if (isNaN(req.body.info_year) || req.body.info_year == '') {
        return res.redirect('/student');
    }

    result = null;
    usr.updatestudentFun(req.query.student_id, req.body, function (result) {
        return res.redirect('/student?student_id=' + req.query.student_id);
    });
});

//删除学生
router.get('/delstu', function (req, res) {
    if (myutil.checklogin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/student');
    }
    else {
        result = null;
        usr.delstudentFun(req.query.student_id, function (result) {
            return res.redirect('/student');
        });
    }
});

//添加工作经历
router.post('/addcareer', function (req, res) {
    if (myutil.checklogin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/');
    }
    else {
        //结束时间需要晚于开始时间
        if (myutil.endgestart(req.body.career_start_time, req.body.career_end_time) == false) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }
        //TODO ，错误提示 非法字符
        if (req.body.career_unit != myutil.stripscript(req.body.career_unit) ||
            req.body.career_position != myutil.stripscript(req.body.career_position)) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }

        //检查 career是否是select 中的
        if (global.career_levels.contains(req.body.career_level) == false) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }

        result = null;

        usr.addcareerFun(req.query.student_id, req.body, function (result) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        });
    }

});

//删除工作经历
router.get('/delcareer', function (req, res) {
    if (myutil.checklogin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '') || isNaN(req.query.career_id)
        || req.query.career_id == '') {
        return res.redirect('/');
    }
    else {
        result = null;
        usr.delcareerFun(req.query.student_id, req.query.career_id, function (result) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        });
    }
});


//修改工作经历
router.post('/updatecareer', function (req, res) {
    if (myutil.checklogin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/');
    }
    else {

        //结束时间需要晚于开始时间
        if (myutil.endgestart(req.body.career_start_time, req.body.career_end_time) == false) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }
        //TODO ，错误提示 非法字符
        if (req.body.career_unit != myutil.stripscript(req.body.career_unit) ||
            req.body.career_position != myutil.stripscript(req.body.career_position)) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }

        //检查 career是否是select 中的
        if (global.career_levels.contains(req.body.career_level) == false) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }
        result = null;

        usr.updatecareerFun(req.query.student_id, req.body, function (result) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        });
    }
});



//上传文件，主要用到multer模块和fs模块。
//TODO 目前采用学号+后缀的命名方式，数据不安全。
router.post('/uploadphoto', photomulter.any(), function (req, res, next) {
    if (myutil.checklogin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/');
    }
    if (req.files.length == 0) {
        return res.redirect('/student?student_id=' + req.query.student_id);
    }
    else {

        var oname = req.files[0].originalname.split('.');
        //获取上传文件后缀
        var suffix = oname.length > 0 ? oname[oname.length - 1] : '';
        if (suffix != 'png' && suffix != 'jpg' && suffix != 'gif' && suffix != 'jpeg') {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }

        //设置文件大小限制10M
        if (req.files[0].size > 10 * 1024 * 1024) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        }

        var des_file = 'public/student_photo/' + req.query.student_id +
            (suffix == '' ? '' : ('.' + suffix));


        //通过rename 进行move
        fs.renameSync(req.files[0].path, des_file);

        usr.updatephotoFun(req.query.student_id, suffix, function (result) {
            return res.redirect('/student?student_id=' + req.query.student_id);
        });
    }
});

router.get('/delstuphoto', function (req, res) {
    if (myutil.checklogin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/');
    }
    usr.deletephotoFun(req.query.student_id, function (result) {
        return res.redirect('/student?student_id=' + req.query.student_id);
    });

});
module.exports = router