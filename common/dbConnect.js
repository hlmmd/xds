var mysql = require('mysql');


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
    if (year == null)
        year = '';

    if (year == '' && province == 100) {
        client.query('select id,year,province_id from xds_student order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }

    else if (year == '') {
        client.query('select id,year,province_id from xds_student where province_id="' + province + '" order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
    else if (province == 100) {
        client.query('select id,year,province_id from xds_student where year="' + year + '" order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }
    else {
        client.query('select id,year,province_id from xds_student where year="' + year + '"' + 'and province_id="' + province + '" order by year,province_id', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
                //throw err;
            }
            callback(results);
        });
    }

}


//按年份和省份查询选调生信息
function studentFun(client, student_id, callback) {
    //client为一个mysql连接对象
    //province =100 表示全部省份
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


exports.connect = connectServer;
exports.regFun = regFun;
exports.loginFun = loginFun;
exports.xdsFun = xdsFun;
exports.studentFun = studentFun;