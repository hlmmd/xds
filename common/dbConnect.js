var mysql = require('mysql');
var myutil = require('./myutil');
var util = require('util');

//所有参数在调用sql之前检查。 api淘汰，改用连接池
function connectServer() {
    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'tj91database',
        database: 'tj91'
    })
    return client;
}

//建立mysql连接池
var pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'tj91database',
    database: 'tj91'
});

function loginFun(username, callback) {

    var sqlstr = util.format('select password,type from xds_users where username="%s"', username);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

function regFun(username, password, callback) {

    var sqlstr = util.format('insert into xds_users (username,password) value("%s","%s")', username, password);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

//按年份和省份查询选调生信息
function xdsFun(year, province, callback) {

    var sqlstr = '';
    if (year == '' && province == '') {
        sqlstr = 'select  student_id,name from xds_student order by student_id';
    }
    else if (year == '') {
        sqlstr = util.format('select student_id ,name from xds_student where province_id=%d order by student_id', province);
    }
    else if (province == '') {
        sqlstr = util.format('select student_id ,name from xds_student where year=%d order by student_id', year);
    }
    else {
        sqlstr = util.format('select student_id ,name from xds_student where year=%d and province_id=%d order by student_id', year, province);
    }

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });

}

// 求所有的选调生毕业年份，做为select的选项
function xdsyearsFun(callback) {

    var sqlstr = 'select distinct year from xds_student order by year; ';
    results = null;
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

//按学号查询选调生信息
function studentFun(student_id, callback) {

    var sqlstr = util.format(' select * from xds_student where student_id = "%d"', student_id);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });

}

//按学号删除选调生
function delstudentFun(student_id, callback) {

    var sqlstr = util.format('delete from xds_student where student_id = "%d"', student_id);
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


//修改选调生信息
function updatestudentFun(student_id, body, callback) {

    var sqlstr = util.format('update xds_student set name ="%s" ,year="%d" where student_id="%d"',
        body.info_name, body.info_year, student_id);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });

}



//按学号查询选调生职位信息
function careerFun(student_id, callback) {

    var sqlstr = util.format('select * from xds_career where student_id = "%d" order by start_time', student_id);
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

//添加选调生职位信息
function addcareerFun(student_id, body, callback) {

    var sqlstr = util.format('insert into xds_career(student_id,start_time,end_time,unit,position,level) values ("%d","%s","%s","%s","%s","%s")',
        student_id, body.career_start_time, body.career_end_time,
        body.career_unit, body.career_position, body.career_level);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


//按学号删除选调生
function delcareerFun(student_id, career_id, callback) {

    var sqlstr = util.format('delete from xds_career where student_id = "%d" and id="%d"',
        student_id, career_id);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

//修改选调生信息
function updatecareerFun(student_id, body, callback) {

    var sqlstr = util.format('update xds_career set start_time ="%s", end_time="%s",unit="%s",position="%s",level="%s" where student_id="%d" and id="%d"',
        body.career_start_time, body.career_end_time, body.career_unit, body.career_position,
        body.career_level, student_id, body.career_id);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}





exports.connect = connectServer;
exports.regFun = regFun;
exports.loginFun = loginFun;

exports.xdsFun = xdsFun;
exports.xdsyearsFun = xdsyearsFun;

exports.studentFun = studentFun;
exports.delstudentFun = delstudentFun;
exports.updatestudentFun = updatestudentFun;

exports.careerFun = careerFun;
exports.addcareerFun = addcareerFun;
exports.delcareerFun = delcareerFun;
exports.updatecareerFun = updatecareerFun;