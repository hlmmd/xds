
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');
var util = require('util');

var moment = require('moment');
moment.locale('zh-cn');

var crypto = require('crypto');

//用于调用shell命令，导出sql文件
var exec = require('child_process').exec;


router.get('/databackup', function (req, res) {

    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }

    return res.render('databackup', {
        title: global.systemtitle,
        navbar_active: 'backup'
    });
});

router.post('/databackup', function (req, res) {

    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }

    var timestr = moment().format('YYYY-MM-DD');
    //var timestr = moment().format('YYYY-MM-DD_hh:mm:ss');
    var filename = util.format('./backup/xds_%s.sql', timestr);
    var cmdStr = util.format('mysqldump -u%s -p%s tj91 > %s ',
        global.databaseuser,
        global.databasepassword,
        filename);

    exec(cmdStr, function (err, stdout, stderr) {
        if (err) {
            console.log(stderr);
            return res.redirect('/');
        } else {
            //console.log(stdout);
            //res.download(stdout);
            return   res.download(filename);
        }
    });
});

module.exports = router;