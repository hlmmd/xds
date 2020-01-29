var mysql = require('mysql');
var myutil = require('./myutil');
var util = require('util');

//所有参数在调用sql之前检查。 api淘汰，改用连接池
function connectServer() {
    var client = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: ''
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

//sql query  ? 占位符，可以避免sql注入问题

function loginFun(username, callback) {

    pool.query('select * from xds_users where username=?', [username], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

function updatepasswordFun(username, password, callback) {

    pool.query('update  xds_users set password =? where username=?', [password, username], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

function regFun(username, password, callback) {

    pool.query('insert into xds_users (username,password) value(?,?)', [username, password], function (err, results, fields) {
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
    //var sqlstr = util.format('delete from xds_student where student_id = "%d"', student_id);
    //改为直接删除学生用户账号，利用外键级联删除特性直接删除学生
    var sqlstr = util.format('delete from xds_users where id = "%d"', student_id);
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


//修改选调生信息
function updatestudentFun(student_id, body, callback) {


    pool.query('update xds_student set name =? ,year=? where student_id=?',
        [body.info_name, body.info_year, student_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}


//修改选调生照片
function updatephotoFun(student_id, photo_suffix, callback) {


    pool.query('update xds_student set photo_suffix =? where student_id=?',
        [photo_suffix, student_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}

//删除选调生照片
function deletephotoFun(student_id, callback) {

    var sqlstr = util.format('update xds_student set photo_suffix ="" where student_id="%d"',
        student_id);

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

    pool.query('insert into xds_career(student_id,start_time,end_time,unit,position,level) values (?,?,?,?,?,?)',
        [student_id, body.career_start_time, body.career_end_time,
            body.career_unit, body.career_position, body.career_level], function (err, results, fields) {
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

    pool.query('update xds_career set start_time =?, end_time=?,unit=?,position=?,level=? where student_id=? and id=?',
        [body.career_start_time, body.career_end_time, body.career_unit, body.career_position,
        body.career_level, student_id, body.career_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}

//查询提交信息
function commentFun(user_id, callback) {

    if (user_id == 0) {
        pool.query('select * from xds_comment where state!=2 order by state asc, timestamp desc', function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
    }
    else {
        pool.query('select * from xds_comment where user_id=? and state!=2  order by state asc, timestamp desc',
            [user_id], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
    }
}


//添加投诉
function addcommentFun(user_id, body, callback) {

    pool.query('insert into xds_comment(user_id,content ) values(?,?)', [user_id, body.content], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


//删除投诉
function delcommentFun(user_id, comment_id, callback) {
    if (user_id == 0) {
        //   pool.query('delete from xds_comment where comment_id=?', [comment_id], function (err, results, fields) {
        pool.query('update xds_comment set state = 2 where comment_id=?', [comment_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
    }
    else {

        pool.query('update xds_comment set state = 2 where user_id=? and comment_id=?', [user_id, comment_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

    }
}
//处理
function dealcommentFun(user_id, comment_id, callback) {

    pool.query('update xds_comment set state=1  where user_id=? and comment_id=?', [user_id, comment_id], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });

}



//添加事件
function addeventFun(photo_file, body, callback) {

    var dt = new Date(body.start_date);
    year = dt.getFullYear();

    pool.query('insert into xds_event (photofile,title,content, year , province_id ,start_date ) values(?,?,?,?,?,?)',
        [photo_file, body.title, body.content, year, body.province, body.start_date], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}

//事件详情
function eventdetailFun(event_id, callback) {

    pool.query('select * from xds_event where event_id=?', event_id, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

//修改事件照片
function eventphotoFun(event_id, photofile, callback) {

    pool.query('update xds_event set photofile =? where event_id=?',
        [photofile, event_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}

//修改事件
function updateeventFun(event_id, body, callback) {

    pool.query('update xds_event set title=? , content=? where event_id=?',
        [body.title, body.content, event_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}

//删除事件
function deleventFun(event_id, callback) {

    pool.query('delete from xds_event  where event_id=?',
        [event_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}


//添加事件文件
function addfileFun(event_id, filename, filepath, callback) {

    pool.query('insert into xds_eventfile (event_id,filename,filepath) values( ?,?,?)',
        [event_id, filename, filepath], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}

//查询文件
function eventfileFun(event_id, callback) {

    pool.query('select * from xds_eventfile where event_id=? order by timestamp', event_id, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


//删除文件 
function deleventfile(file_id, callback) {

    pool.query('delete from xds_eventfile  where file_id=?',
        [file_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}




exports.connect = connectServer;
exports.regFun = regFun;
exports.loginFun = loginFun;
exports.updatepasswordFun = updatepasswordFun;

exports.xdsFun = xdsFun;
exports.xdsyearsFun = xdsyearsFun;

exports.studentFun = studentFun;
exports.delstudentFun = delstudentFun;
exports.updatestudentFun = updatestudentFun;
exports.updatephotoFun = updatephotoFun;
exports.deletephotoFun = deletephotoFun;


exports.careerFun = careerFun;
exports.addcareerFun = addcareerFun;
exports.delcareerFun = delcareerFun;
exports.updatecareerFun = updatecareerFun;

exports.commentFun = commentFun;
exports.addcommentFun = addcommentFun;
exports.delcommentFun = delcommentFun;
exports.dealcommentFun = dealcommentFun;

exports.addeventFun = addeventFun;
exports.eventdetailFun = eventdetailFun;
exports.eventphotoFun = eventphotoFun;
exports.updateeventFun = updateeventFun;
exports.deleventFun = deleventFun;


exports.addfileFun = addfileFun;
exports.eventfileFun = eventfileFun;
exports.deleventfile = deleventfile;