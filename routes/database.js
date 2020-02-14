
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
    '就业年份': 'year',
    '姓名': 'name',
    '性别': 'xingbie',
    '民族': 'minzu',
    '政治面貌': 'zzmm',
    '出生日期': 'csrq',
    '身份证件号': 'sfzjh',
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
    //这项导出来是联系电话，对不上
    '档案接收联系电话': 'dajslxdh'
}


var columns2 = {
    //   '学号': 'student_id',
    '就业年份': 'year',
    '姓名': 'name',
    '性别': 'xingbie',
    '民族': 'minzu',
    '政治面貌': 'zzmm',
    '出生日期': 'csrq',
    '身份证件号': 'sfzjh',
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
    '生源地': 'syd',
    '手机号': 'shoujihao',
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
    //导出来，档案接收联系电话，变成了联系电话
    '联系电话': 'dajslxdh'

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

        if (data.length == 0) {
            return res.render('uploadstudent', {
                title: global.systemtitle,
                navbar_active: 'backup',
                errmsg: '导入失败'
            });
        }

        //必须要有学号
        if (data[0].hasOwnProperty('学号') == false) {
            return res.render('uploadstudent', {
                title: global.systemtitle,
                navbar_active: 'backup',
                errmsg: '导入失败'
            });
        }

        usr.student_idFun(function (exist_student_ids) {

            //exist_student_ids保存着目前数据库内存在的所有学生用户,转化成集合esid
            esid = {};
            for (i = 0; i < exist_student_ids.length; i++) {
                esid[exist_student_ids[i].student_id] = exist_student_ids[i].student_id;
            }

            //遍历每一行数据
            for (var i = 0; i < data.length; i++) {

                var student_id = data[i]['学号'];
                //学号已经存在
                if (isNaN(student_id) || student_id == '' || esid.hasOwnProperty(student_id) === true) {
                    continue;
                }

                //注册用户
                usr.regstudentFun(student_id, i, function (i, res) {

                    var student_id = data[i]['学号'];
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

                    for (j = 1; j < sqlparm.length; j++) {
                        sqlstr += ',?';
                    }
                    sqlstr += ')';

                    // console.log(sqlstr);
                    // console.log(sqlparm);
                    // console.log(sqlparm.length);

                    // 插入数据
                    usr.sqlqueryFun(sqlstr, sqlparm, function (result) {
                        //
                    });
                });

            }
        });

        return res.render('uploadstudent', {
            title: global.systemtitle,
            navbar_active: 'backup',
            errmsg: '导入完成'
        });
    }
});



//毕业去向 
router.post('/uploadbyqx', filemulter.any(), function (req, res) {

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
                errmsg2: '导入失败'
            });
        }

        const worksheet = workbook.Sheets[sheetNames[0]];

        //将 excel数据转化为json
        var data = excel.utils.sheet_to_json(worksheet);
        if (data.length == 0) {
            return res.render('uploadstudent', {
                title: global.systemtitle,
                navbar_active: 'backup',
                errmsg2: '导入失败'
            });
        }

        //必须要有学号
        if (data[0].hasOwnProperty('学号') == false) {
            return res.render('uploadstudent', {
                title: global.systemtitle,
                navbar_active: 'backup',
                errmsg2: '没找到学号'
            });
        }

        //必须要有单位所在地区
        if (data[0].hasOwnProperty('单位所在地区') == false) {
            return res.render('uploadstudent', {
                title: global.systemtitle,
                navbar_active: 'backup',
                errmsg2: '没找到单位所在地区'
            });
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
                //学号不存在,则上传失败
                if (isNaN(student_id) || student_id == '' || esid.hasOwnProperty(student_id) === false) {
                    continue;
                }

                var provs = data[i]['单位所在地区'].split('/');
                var province_id = 34;
                for (j = 0; j < global.provinces.length; j++) {
                    if (global.provinces[j] == provs[0]) {
                        province_id = j;
                        break;
                    }
                }
                // if (province_id == 34) {
                //   //  console.log(data[i]['单位所在地区'] + ',未找到所在地区');
                //   //  continue;
                // }

                var sqlstr = 'update xds_student set province_id =? ';
                var sqlparm = [];
                sqlparm.push(province_id);
                //遍历excel中的数据，再和columns中的比对
                for (var key in data[i]) {
                    if (columns2.hasOwnProperty(key)) {

                        sqlstr += ',' + columns2[key] + '=?';
                        sqlparm.push(data[i][key]);
                    }
                }

                //补全sql
                sqlstr += ' where student_id=?';
                sqlparm.push(student_id);

                // console.log(sqlstr);
                // console.log(sqlparm);
                // console.log(sqlparm.length);

                //插入数据
                usr.sqlqueryFun(sqlstr, sqlparm, function (result) {
                    //
                });
            }

        });

        return res.render('uploadstudent', {
            title: global.systemtitle,
            navbar_active: 'backup',
            errmsg2: '导入完成'
        });
    }
});


var exstudent = {
    'photofile': undefined,
    'student_id': '学号',
    'name': '姓名',
    'year': '就业年份',
    'province_id': '就业省份',
    'xingbie': '性别',
    'minzu': '民族',
    'zzmm': '政治面貌',
    'csrq': '出生日期',
    'sfzjh': '身份证件号',
    'xueyuan': '学院',
    'xisuo': '系所',
    'xslx': '学生类型',
    'xueli': '学历',
    'xuewei': '学位',
    'zhuanye': '专业',
    'xjzt': '学籍状态',
    'xuezhi': '学制',
    'rxny': '入学年月',
    'rxfs': '入学方式',
    'pyfs': '培养方式',
    'syd': '生源地',
    'shoujihao': '手机号',
    'lxdh': '联系电话',
    'jtdz': '家庭地址',
    'jtdh': '家庭电话',
    'dzxx': '电子信箱',
    'qqhao': 'QQ号',
    'weixinhao': '微信号',
    'lxdz': '联系地址',
    'yzbh': '邮政编号',
    'xysbh': '协议书编号',
    'qxlx': '去向类型',
    'dwmc': '单位名称',
    'zzjgdm': '组织机构代码',
    'tyshxydm': '统一社会信用代码',
    'sqlx': '申请类型',
    'xxdjh': '信息登记号',
    'dwxz': '单位性质',
    'dwhy': '单位行业',
    'zwlb': '职位类别',
    'dwszdq': '单位所在地区',
    'dwtxdz': '单位通讯地址',
    'lxrdh': '联系人电话',
    'bdzdwmc': '报到证单位名称',
    'bdzbh': '报到证编号',
    'bdzdwdq': '报到证单位地区',
    'dajsdw': '档案接收单位',
    'dajsyb': '档案接收邮编',
    'dajsdz': '档案接收地址',
    'dajslxdh': '档案接收联系电话'
}


//导出页面
router.get('/export', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }
    return res.render('export', {
        title: global.systemtitle,
        navbar_active: 'backup'
    });
});


//导出学生
router.post('/exportstudent', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }

    usr.exportstudentFun(function (result) {

        if (result === undefined || result.length == 0) {
            return res.render('export', {
                title: global.systemtitle,
                navbar_active: 'backup'
            });
        }
        var dataoutput = [];
        var _headers = [];
        for (var key in result[0]) {
            if (exstudent[key] !== undefined)
                _headers.push(exstudent[key]);
        }
        dataoutput.push(_headers);

        for (i = 0; i < result.length; i++) {
            var datatemp = [];
            for (var key in result[i]) {
                if (exstudent[key] !== undefined) {
                    if (key == 'province_id') {
                        datatemp.push(global.provinces[result[i][key]]);
                    }
                    else
                        datatemp.push(result[i][key]);
                }
            }
            dataoutput.push(datatemp);
        }

        // 将数据转成workSheet
        var arrayWorkSheet = excel.utils.aoa_to_sheet(dataoutput);
        // 构造workBook
        workBook = {
            SheetNames: ['学生数据'],
            Sheets: {
                '学生数据': arrayWorkSheet,
            }
        };
        var timestr = moment().format('YYYY-MM-DD');
        filename = "./backup/student/" + timestr + ".xlsx";

        excel.writeFile(workBook, filename);

        res.download(filename, "学生数据.xlsx");
    });
});



//导出工作经历
router.post('/exportcareer', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }

    usr.exportstudentFun(function (result) {

        if (result === undefined || result.length == 0) {
            return res.render('export', {
                title: global.systemtitle,
                navbar_active: 'backup'
            });
        }
        var dataoutput = [];
        var _headers = [];
        for (var key in result[0]) {
            if (exstudent[key] !== undefined)
                _headers.push(exstudent[key]);
        }
        dataoutput.push(_headers);

        for (i = 0; i < result.length; i++) {
            var datatemp = [];
            for (var key in result[i]) {
                if (exstudent[key] !== undefined) {
                    if (key == 'province_id') {
                        datatemp.push(global.provinces[result[i][key]]);
                    }
                    else
                        datatemp.push(result[i][key]);
                }
            }
            dataoutput.push(datatemp);
        }

        // 将数据转成workSheet
        var arrayWorkSheet = excel.utils.aoa_to_sheet(dataoutput);
        // 构造workBook
        workBook = {
            SheetNames: ['学生数据'],
            Sheets: {
                '学生数据': arrayWorkSheet,
            }
        };
        var timestr = moment().format('YYYY-MM-DD');
        filename = "./backup/student/" + timestr + ".xlsx";

        excel.writeFile(workBook, filename);

        res.download(filename, "学生数据.xlsx");
    });
});


//导出学生工作
router.post('/exportevent', function (req, res) {
    if (myutil.checklogin_admin(req, res) == false) {
        return res.redirect('/');
    }

    usr.exportstudentFun(function (result) {

        if (result === undefined || result.length == 0) {
            return res.render('export', {
                title: global.systemtitle,
                navbar_active: 'backup'
            });
        }
        var dataoutput = [];
        var _headers = [];
        for (var key in result[0]) {
            if (exstudent[key] !== undefined)
                _headers.push(exstudent[key]);
        }
        dataoutput.push(_headers);

        for (i = 0; i < result.length; i++) {
            var datatemp = [];
            for (var key in result[i]) {
                if (exstudent[key] !== undefined) {
                    if (key == 'province_id') {
                        datatemp.push(global.provinces[result[i][key]]);
                    }
                    else
                        datatemp.push(result[i][key]);
                }
            }
            dataoutput.push(datatemp);
        }

        // 将数据转成workSheet
        var arrayWorkSheet = excel.utils.aoa_to_sheet(dataoutput);
        // 构造workBook
        workBook = {
            SheetNames: ['学生数据'],
            Sheets: {
                '学生数据': arrayWorkSheet,
            }
        };
        var timestr = moment().format('YYYY-MM-DD');
        filename = "./backup/student/" + timestr + ".xlsx";

        excel.writeFile(workBook, filename);

        res.download(filename, "学生数据.xlsx");
    });
});




module.exports = router;