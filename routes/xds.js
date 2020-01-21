
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var util = require('../common/util');

router.get('/xds', function (req, res) {

    if (util.checklogin(req, res) == false) {
        res.redirect('/');
    }
    else
        res.render('xds', { title: global.systemtitle });

});

router.post('/xds', function (req, res) {
    if (util.checklogin(req, res) == false  ) {
        res.redirect('/');
    }
    else if( isNaN(req.body.year) || isNan(req.body.province))
    {
        res.redirect('/xds');
    }
    else {

        client = usr.connect();
        result = null;
        usr.xdsFun(client, req.body.year, req.body.province, function (result) {
            
            res.render('xds', { title: global.systemtitle, students: result });

        });
    }
});

module.exports = router;