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

exports.connect = connectServer;
exports.regFun = regFun;
exports.loginFun = loginFun;
