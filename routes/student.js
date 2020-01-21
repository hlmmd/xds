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
            res.render('student', { title: '选调生管理系统' });
        else {
            client = usr.connect();
            result = null;
            usr.studentFun(client, req.query.student_id, function (result) {
                if(result==null)
                {
                    res.render('student', { title: '选调生管理系统' });
                }
                else if (result[0] !== undefined) {
                    result[0].province = util.getprovincename(result[0].province_id);
                    res.render('student', { title: '选调生管理系统', stu_info: result[0] });
                }
                else{
                    res.render('student', { title: '选调生管理系统', notfound: '未找到' });
                }
            });
        }
    }

});


module.exports = router