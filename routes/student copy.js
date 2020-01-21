var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

router.get('/student', function (req, res) {

    if (util.checklogin(req, res) == false) {
        res.redirect('/');
    }
    else {
        if (req.query.name == undefined && req.query.student_id == undefined)
            res.render('student', { title: '选调生管理系统' });
        else{
            client = usr.connect();
            result = null;
            usr.studentFun(client,req.query.name,req.query.student_id ,function (result) {
               res.render('student', { title: '选调生管理系统', students: result });
    
            });
        }
        //    else
    //        res.send(req.query.name + req.query.student_id);
        //  
    }

});


module.exports = router