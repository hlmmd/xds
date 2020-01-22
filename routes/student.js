var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

router.get('/student', function (req, res) {
    if (util.checklogin(req, res) == false) {
        res.redirect('/');
    }
    else {
        if (req.query.student_id == undefined)
            res.render('student', { title: global.systemtitle });
        else if (isNaN(req.query.student_id) || req.query.student_id == '')
            res.redirect('/student');
        else {
            client = usr.connect();
            result = null;
            usr.studentFun(client, req.query.student_id, function (result) {
                if (result == null) {
                    res.render('student', { title: global.systemtitle });
                }
                else if (result[0] !== undefined) {
                    result[0].province = util.getprovincename(result[0].province_id);

                    //继续读取career信息
                    cresult = null;
                    usr.careerFun(client, req.query.student_id, function (cresult) {
                        for (i = 0; i < cresult.length; i++) {
                            cresult[i].start_time = util.Datetoyyyymmdd(cresult[i].start_time);
                            cresult[i].end_time = util.Datetoyyyymmdd(cresult[i].end_time);
                        }
                        res.render('student', { title: global.systemtitle, stu_info: result[0], careers: cresult, career_levels: global.career_levels });
                    });
                }
                else {
                    res.render('student', { title: global.systemtitle, notfound: '未找到' });
                }
            });
        }
    }
});


//修改学生信息
router.post('/student', function (req, res) {
    if (util.checklogin(req, res) == false) {
        res.redirect('/');
    }
    else {
        client = usr.connect();
        result = null;

        usr.updatestudentFun(client, req.query.student_id, req.body, function (result) {
            res.redirect('/student?student_id=' + req.query.student_id);
            //res.render('student', { title: global.systemtitle, students: result });
        });
    }
});

router.get('/delstu', function (req, res) {
    if (util.checklogin(req, res) == false || (req.query.student_id == undefined)
        || (req.query.student_id == '') || isNaN(req.query.student_id)) {
        res.redirect('/');
    }
    else {
        client = usr.connect();
        result = null;
        usr.delstudentFun(client, req.query.student_id, function (result) {
            res.redirect('/student');
        });
    }
});

//添加工作经历
router.post('/addcareer', function (req, res) {
    if (util.checklogin(req, res) == false || (req.query.student_id == undefined)
        || (req.query.student_id == '') || isNaN(req.query.student_id)) {
        res.redirect('/');
    }
    else {
        client = usr.connect();
        result = null;

        usr.addcareerFun(client, req.query.student_id, req.body, function (result) {
            res.redirect('/student?student_id=' + req.query.student_id);
        });
    }

});

//删除工作经历
router.get('/delcareer', function (req, res) {
    if (util.checklogin(req, res) == false || (req.query.student_id == undefined)
        || (req.query.student_id == '') || isNaN(req.query.student_id)
        || isNaN(req.query.career_id)) {
        res.redirect('/');
    }
    else {
        client = usr.connect();
        result = null;
        usr.delcareerFun(client, req.query.student_id, req.query.career_id, function (result) {
            res.redirect('/student?student_id=' + req.query.student_id);
        });
    }
});


//修改工作经历
router.post('/updatecareer', function (req, res) {
    if (util.checklogin(req, res) == false || (req.query.student_id == undefined)
        || (req.query.student_id == '') || isNaN(req.query.student_id)) {
        res.redirect('/');
    }
    else {
        client = usr.connect();
        result = null;

        usr.updatecareerFun(client, req.query.student_id, req.body, function (result) {
            res.redirect('/student?student_id=' + req.query.student_id);
        });
    }
});



module.exports = router