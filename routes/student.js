var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

router.get('/student', function (req, res) {
    if (util.checklogin(req, res) == false) {
        res.redirect('/');
    }
    else {
        if (req.query.student_id == undefined || isNaN(req.query.student_id))
            res.render('student', { title: global.systemtitle });
        else {
            client = usr.connect();
            result = null;
            usr.studentFun(client, req.query.student_id, function (result) {
                if (result == null) {
                    res.render('student', { title: global.systemtitle });
                }
                else if (result[0] !== undefined) {
                    result[0].province = util.getprovincename(result[0].province_id);
                    res.render('student', { title: global.systemtitle, stu_info: result[0] });
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
        var stu_info = new Array();;

        stu_info['student_id'] = req.query.student_id;
        stu_info['name'] = req.body.info_name;
        stu_info['year'] = req.body.info_year;
        usr.updatestudentFun(client, stu_info, function (result) {
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


module.exports = router