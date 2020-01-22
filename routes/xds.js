
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

router.get('/xds', function (req, res) {
    if (util.checklogin(req, res) == false) {
        res.redirect('/');
    }
    else if (req.query.year === undefined && req.query.province === undefined) {
        res.render('xds', { title: global.systemtitle, provinces: global.provinces });
    }
    else if (isNaN(req.query.year) || isNaN(req.query.province)) {
        res.redirect('/xds');
    }
    else {
        client = usr.connect();
        result = null;
        usr.xdsFun(client, req.query.year, req.query.province, function (result) {
            res.render('xds', {
                title: global.systemtitle, provinces: global.provinces, students: result,
                year: req.query.year, province_id: req.query.province
            });
        });
    }
});

// router.post('/xds', function (req, res) {
//     if (util.checklogin(req, res) == false) {
//         res.redirect('/');
//     }
//     else if (isNaN(req.body.year) || isNaN(req.body.province)) {
//         res.redirect('/xds');
//     }
//     else {

//         client = usr.connect();
//         result = null;
//         usr.xdsFun(client, req.body.year, req.body.province, function (result) {

//             res.render('xds', { title: global.systemtitle, students: result });

//         });
//     }
// });

module.exports = router;