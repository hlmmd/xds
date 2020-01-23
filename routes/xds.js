
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');

router.get('/xds', function (req, res) {
    if (myutil.checklogin(req, res) == false) {
        return res.redirect('/');
    }
    client = usr.connect();
    years = null;
    years = usr.xdsyearsFun(client, function (years) {
        if (req.query.year === undefined && req.query.province === undefined) {
            res.render('xds', { title: global.systemtitle, years: years, provinces: global.provinces });
        }
        else if (isNaN(req.query.year) || isNaN(req.query.province)) {
            res.redirect('/xds');
        }
        else {
            result = null;
            usr.xdsFun(client, req.query.year, req.query.province, function (result) {
                res.render('xds', {
                    title: global.systemtitle, years: years, provinces: global.provinces, students: result,
                    year: req.query.year, province_id: req.query.province
                });
            });
        }
    });


});


module.exports = router;