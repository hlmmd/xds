var mysql = require('mysql');
var myutil = require('./myutil');

var util = require('util');

function connectServer() {
    var client = mysql.createConnection({
        host: 'localhost',
        //host: '120.27.249.122',
        user: 'root',
        password: 'tj91database',
        database: 'tj91'
    })

    return client;
}

function loginFun(client, username, callback) {
    //client为一个mysql连接对象
    client.query('select password,type from xds_users where username="' + username + '"', function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
            //throw err;
        }
        callback(results);
    });
}

function regFun(client, username, password, callback) {

    client.query("insert into xds_users (username,password) value(?,?)", [username, password], function (err, results, fields) {

        if (err) {
            console.log("error:" + err.message);

        }
        callback(err);
    });
}

//按年份和省份查询选调生信息
function xdsFun(client, year, province, callback) {
    //client为一个mysql连接对象
    //province =100 表示全部省份

    var ss = util.format('%s%s','xxx','xxx');
    console.log(ss);

    if (year == '' && province == '') {
        client.query('select student_id,name from xds_student order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
    else if (year == '') {
        client.query('select student_id,name from xds_student where province_id="' + province + '" order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
    else if (province == '') {
        client.query('select student_id,name from xds_student where year="' + year + '" order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
    else {
        client.query('select student_id,name from xds_student where year="' + year + '"' + 'and province_id="' + province + '" order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }

}

function xdsyearsFun(client, callback) {
    //client为一个mysql连接对象

    var sqlstr = 'select distinct year from xds_student order by year; ';
    results = null;
    client.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
            //throw err;
        }
        callback(results);
    });
}


//按学号查询选调生信息
function studentFun(client, student_id, callback) {
    //client为一个mysql连接对象
    if (student_id == undefined || student_id == '') {
        callback(null);
    }
    else {
        var sqlstr = 'select * from xds_student where student_id = "' + student_id + '"';

        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }

}


//按学号删除选调生
function delstudentFun(client, student_id, callback) {
    if (student_id == undefined || student_id == '') {
        callback(null);
    }
    else {
        var sqlstr = 'delete from xds_student where student_id = "' + student_id + '"';

        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
}


//修改选调生信息
function updatestudentFun(client, student_id, body, callback) {
    if (isNaN(student_id)) {
        callback(null);
    }
    else {
        var sqlstr = 'update xds_student set name =\'' + body.info_name +
            '\', year =\'' + body.info_year +
            '\' where student_id = "' + student_id + '"';
        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
}



//按学号查询选调生职位信息
function careerFun(client, student_id, callback) {
    //client为一个mysql连接对象
    if (student_id == undefined || student_id == '') {
        callback(null);
    }
    else {
        var sqlstr = 'select * from xds_career where student_id = "' + student_id + '" order by start_time';
        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
}

//添加选调生职位信息
function addcareerFun(client, student_id, body, callback) {
    //client为一个mysql连接对象
    if (student_id == undefined || student_id == '') {
        callback(null);
    }
    else if (global.career_levels.contains(body.career_level) == false) {
        callback(null);
    }
    else {
        //简单防止sql注入
        body.career_unit = myutil.stripscript(body.career_unit);
        body.career_position = myutil.stripscript(body.career_position);
        var sqlstr = 'insert into xds_career(student_id,start_time,end_time,unit,position,level) values(\''
            + student_id + '\',\''
            + body.career_start_time + '\',\''
            + body.career_end_time + '\',\''
            + body.career_unit + '\',\''
            + body.career_position + '\',\''
            + body.career_level + '\')';
        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
}


//按学号删除选调生
function delcareerFun(client, student_id, career_id, callback) {
    if (isNaN(student_id) || isNaN(career_id)) {
        callback(null);
    }
    else {
        var sqlstr = 'delete from xds_career where student_id = "' +
            student_id + '"' + 'and id=\'' + career_id + '\'';
        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
    }
}



//修改选调生信息
function updatecareerFun(client, student_id, body, callback) {
    if (isNaN(student_id)) {
        callback(null);
    }
    else {
        var sqlstr = 'update xds_career set start_time =\'' + body.career_start_time +
            '\', end_time =\'' + body.career_end_time +
            '\', unit =\'' + body.career_unit +
            '\', position =\'' + body.career_position +
            '\', level =\'' + body.career_level +
            '\' where student_id = "' + student_id + '"' +
            'and id = \'' + body.career_id + '\'';
        client.query(sqlstr, function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
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