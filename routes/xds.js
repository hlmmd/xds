
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');

router.get('/xds', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    years = null;
    xueyuans = null;
    usr.xdsyearsFun(function (years) {
        usr.xdsXueyuanFun(function (xueyuans) {
            //req.query未定义，说明是尚未查询，直接渲染
            if (req.query.year === undefined && req.query.province === undefined && req.query.xueyuan === undefined && req.query.sort === undefined) {
                return res.render('xds', {
                    title: global.systemtitle,
                    navbar_active: 'xds',
                    years: years, 
                    xueyuans: xueyuans,
                    provinces: global.provinces
                });
            }
            else if (isNaN(req.query.year) || isNaN(req.query.province)) {
                //已经查询，Url不合法，跳转到/xds页面
                return res.redirect('/xds');
            }
            else {
                //合法查询
                result = null;
                usr.xdsFun(req.query.year, req.query.province, req.query.xueyuan,req.query.sort, function (result) {
                    return res.render('xds', {
                        title: global.systemtitle,
                        years: years,
                        navbar_active: 'xds',
                        provinces: global.provinces,
                        students: result,
                        year: req.query.year,
                        xueyuan: req.query.xueyuan,
                        xueyuans: xueyuans,
                        province_id: req.query.province
                    });
                });
            }
        });
    });

});


module.exports = router;