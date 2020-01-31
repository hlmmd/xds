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
    if (myutil.checklogin_admin(req, res) == false) {
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

//按学号查询
router.post('/studentid', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    if (isNaN(req.body.student_id) || req.body.student_id == '') {
        return res.redirect('/student');
    }
    usr.studentidlikeFun(req.body.student_id, function (result) {
        if (result === undefined || result.length == 0) {
            return res.render('student', {
                title: global.systemtitle,
                navbar_active: 'student',
                notfound: '未找到'
            });
        }
        else {
            return res.render('student', {
                title: global.systemtitle,
                navbar_active: 'student',
                provinces: global.provinces,
                query: result
            });
        }
    });
});

//按姓名查询
router.post('/studentname', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    if (req.body.name === undefined || req.body.name == '') {
        return res.redirect('/student');
    }
    usr.studentnamelikeFun(req.body.name, function (result) {
        if (result === undefined || result.length == 0) {
            return res.render('student', {
                title: global.systemtitle,
                navbar_active: 'student',
                notfound: '未找到'
            });
        }
        else {
            return res.render('student', {
                title: global.systemtitle,
                navbar_active: 'student',
                provinces: global.provinces,
                query: result
            });
        }
    });
});

//修改学生信息
router.post('/student', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }

    if (isNaN(req.query.student_id) || req.query.student_id == '') {
        return res.redirect('/student');
    }

    result = null;
    usr.updatestudentFun(req.query.student_id, req.body, function (result) {
        return res.redirect('/student?student_id=' + req.query.student_id);
    });
});

//删除学生
router.post('/delstu', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.body.student_id)
        || (req.body.student_id == '')) {
        return res.redirect('/student');
    }
    else {
        result = null;
        usr.delstudentFun(req.body.student_id, function (result) {
            return res.redirect('/student');
        });
    }
});

//添加工作经历
router.post('/addcareer', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/');
    }
    else {
        //结束时间需要晚于开始时间
        if (myutil.endgestart(req.body.career_start_time, req.body.career_end_time) == false) {
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
router.post('/delcareer', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.body.career_id)
        || req.body.career_id == '') {
        return res.redirect('/');
    }
    else {
        result = null;
        console.log(req.body);
        usr.delcareerFun(req.body.career_id, function (result) {
            return res.redirect('/');
            //javascript会自动刷新
        });
    }
});


//修改工作经历
router.post('/updatecareer', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.query.student_id)
        || (req.query.student_id == '')) {
        return res.redirect('/');
    }
    else {

        //结束时间需要晚于开始时间
        if (myutil.endgestart(req.body.career_start_time, req.body.career_end_time) == false) {
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
router.post('/uploadphoto', photomulter.any(), function (req, res, next) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.body.student_id)
        || (req.body.student_id == '')) {
        return res.redirect('/');
    }
    if (req.files.length == 0) {
        return res.redirect('/student?student_id=' + req.body.student_id);
    }
    else {

        var oname = req.files[0].originalname.split('.');
        //获取上传文件后缀
        var suffix = oname.length > 0 ? oname[oname.length - 1] : '';
        if (suffix != 'png' && suffix != 'jpg' && suffix != 'gif' && suffix != 'jpeg') {
            fs.unlinkSync(req.files[0].path);
            return res.redirect('/student?student_id=' + req.body.student_id);
        }

        //设置文件大小限制
        if (req.files[0].size > global.filelimit * 1024 * 1024) {
            fs.unlinkSync(req.files[0].path);
            return res.redirect('/student?student_id=' + req.body.student_id);
        }

        var des_file = 'public/student_photo/' + req.files[0].filename +
            (suffix == '' ? '' : ('.' + suffix));

        var photofile = '/student_photo/' + req.files[0].filename +
            (suffix == '' ? '' : ('.' + suffix));

        //通过rename 进行move
        fs.renameSync(req.files[0].path, des_file);

        usr.updatephotoFun(req.body.student_id, photofile, function (result) {
            return res.redirect('/student?student_id=' + req.body.student_id);
        });
    }
});

router.post('/delstuphoto', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false || isNaN(req.body.student_id)
        || (req.body.student_id == '')) {
        return res.redirect('/');
    }
    usr.deletephotoFun(req.body.student_id, function (result) {
        return res.redirect('/student?student_id=' + req.body.student_id);
    });

});

router.get('/student_stu', function (req, res) {

    if (myutil.checklogin_student(req, res) == false) {
        return res.redirect('/');
    }
    else {
        usr.studentFun(req.cookies.user_id, function (result) {
            if (result !== undefined && result.length != 0 ) {
                result[0].province = myutil.getprovincename(result[0].province_id);

                //继续读取career信息
                cresult = null;
                usr.careerFun(req.cookies.user_id, function (cresult) {
                    for (i = 0; i < cresult.length; i++) {
                        cresult[i].start_time = myutil.Datetoyyyymmdd(cresult[i].start_time);
                        cresult[i].end_time = myutil.Datetoyyyymmdd(cresult[i].end_time);
                    }
                    return res.render('student_stu', {
                        title: global.systemtitle,
                        navbar_active: 'student',
                        stu_info: result[0],
                        careers: cresult,
                        career_levels: global.career_levels
                    });
                });
            }
        });

    }

});


module.exports = router