
var express = require('express');
var router = express.Router();
var usr = require('../common/dbConnect');
var myutil = require('../common/myutil');
var util = require('util');

//读取excel
var excel = require('xlsx');

var fs = require('fs');
//上传文件使用
var multer = require('multer');
//上传的文件放在临时文件夹中
var filemulter = multer({ dest: './public/tmp/' });


var moment = require('moment');
moment.locale('zh-cn');

var crypto = require('crypto');

//用于调用shell命令，导出sql文件
var exec = require('child_process').exec;


var columns = {
    //   '学号': 'student_id',
    '姓名': 'name',
    '性别': 'xingbie',
    '民族': 'mingzu',
    '政治面貌': 'zzmm',
    '出生日期': 'csrq',
    '身份证件号': 'sfzjh',
    '健康状况': 'jkzk',
    '学院': 'xueyuan',
    '系所': 'xisuo',
    '学生类型': 'xslx',
    '学历': 'xueli',
    '学位': 'xuewei',
    '专业': 'zhuanye',
    '学籍状态': 'xjzt',
    '学制': 'xuezhi',
    '入学年月': 'rxny',
    '入学方式': 'rxfs',
    '培养方式': 'pyfs',
    '就业年份': 'jynf',
    '生源地': 'syd',
    '手机号': 'shoujihao',
    '联系电话': 'lxdh',
    '家庭地址': 'jtdz',
    '家庭电话': 'jtdh',
    '电子信箱': 'dzxx',
    'QQ号': 'qqhao',
    '微信号': 'weixinhao',
    '联系地址': 'lxdz',
    '邮政编号': 'yzbh',
    '协议书编号': 'xysbh',
    '去向类型': 'qxlx',
    '单位名称': 'dwmc',
    '组织机构代码': 'zzjgdm',
    '统一社会信用代码': 'tyshxydm',
    '申请类型': 'sqlx',
    '信息登记号': 'xxdjh',
    '是否为自主创业并与自身创办企业签约': 'zzcy',
    '单位性质': 'dwxz',
    '单位行业': 'dwhy',
    '职位类别': 'zwlb',
    '单位所在地区': 'dwszdq',
    '单位通讯地址': 'dwtxdz',
    '联系人电话': 'lxrdh',
    '报到证单位名称': 'bdzdwmc',
    '报到证编号': 'bdzbh',
    '报到证单位地区': 'bdzdwdq',
    '档案接收单位': 'dajsdw',
    '档案接收邮编': 'dajsyb',
    '档案接收地址': 'dajsdz',
    '档案接收联系电话': 'dajslxdh'
}


router.get('/databackup', function (req, res) {

    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }

    return res.render('databackup', {
        title: global.systemtitle,
        navbar_active: 'backup'
    });
});

router.post('/databackup', function (req, res) {

    if (myutil.checklogin_admin(req, res) == false) {
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
            //res.download(stdout);
            return res.download(filename);
        }
    });
});

//上传学生信息
router.get('/uploadstudent', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    return res.render('uploadstudent', {
        title: global.systemtitle,
        navbar_active: 'backup'
    });
});


//base中有21项（包括学号）
router.post('/uploadbase', filemulter.any(), function (req, res) {

    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    else if (req.files.length == 0) {
        return res.redirect('/uploadstudent');
    }
    else {
        //读取excel文件
        var workbook = excel.readFile(req.files[0].path);
        //获取所有sheet
        const sheetNames = workbook.SheetNames;
        //没有表
        if (sheetNames.length == 0) {
            return res.render('uploadstudent', {
                title: global.systemtitle,
                navbar_active: 'backup',
                errmsg: '导入失败'
            });
        }

        const worksheet = workbook.Sheets[sheetNames[0]];

        //将 excel数据转化为json
        var data = excel.utils.sheet_to_json(worksheet);
        if (data.length == 0)
            return res.redirect('/uploadstudent');

        //必须要有学号
        if (data[0].hasOwnProperty('学号') == false) {
            return res.redirect('/uploadstudent');
        }

        usr.student_idFun(function (exist_student_ids) {
            //exist_student_ids保存着目前数据库内存在的所有学生用户,转化成集合esid
            esid = {};
            for (i = 0; i < exist_student_ids.length; i++) {
                esid[exist_student_ids[i].student_id] = exist_student_ids[i].student_id;
            }

            //遍历每一行数据
            for (i = 0; i < data.length; i++) {

                var student_id = data[i]['学号'];
                //学号已经存在
                if (esid.hasOwnProperty(student_id) === true) {
                    continue;
                }

                //注册用户
                usr.regstudentFun(student_id, function (res) {
                    //console.log(res);
                });

                var sqlstr = 'insert into xds_student(student_id';
                var sqlparm = [];
                sqlparm.push(student_id);
                //遍历excel中的数据，再和columns中的比对
                for (var key in data[i]) {
                    //如果columns中存在，说明是我们需要的，则保留
                    if (columns.hasOwnProperty(key)) {
                        sqlstr += ',' + columns[key];
                        sqlparm.push(data[i][key]);
                        //  console.log(columns[key] + '->' + data[i][key]);
                    }
                }

                sqlstr += ')values(?';

                for (i = 1; i < sqlparm.length; i++) {
                    sqlstr += ',?';
                }
                sqlstr += ')';

                //插入数据
                usr.sqlqueryFun(sqlstr, sqlparm, function (result) {
                    //
                });
            }

        });


        return res.redirect('/uploadstudent');
    }
});

module.exports = router;