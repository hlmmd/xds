
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

router.get('/xds', function (req, res) {

    if (util.checklogin(req, res) == false) {
        res.send("未登录");
    }
    else
        res.render('xds', { title: '选调生管理系统' });

});

router.post('/xds', function (req, res) {
    if (util.checklogin(req, res) == false) {
        res.send("未登录");
    }
    else {

        client = usr.connect();
        result = null;
        usr.xdsFun(client, req.body.year, req.body.province, function (result) {
            
            res.render('xds', { title: '选调生管理系统', students: result });

        });
    }



});

module.exports = router;