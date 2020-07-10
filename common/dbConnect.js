var mysql = require('mysql');
var myutil = require('./myutil');
var util = require('util');

var crypto = require('crypto');
var bcrypt = require('bcrypt');

function cryptPwd(password) {
    const saltRounds = 10; //随机生成salt
    const salt = bcrypt.genSaltSync(saltRounds); //获取hash值
    var hash = bcrypt.hashSync(password, salt);
    return hash;
    // var md5 = crypto.createHash('md5');
    // return md5.update(password).digest('hex');
}

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
    user: global.databaseuser,
    password: global.databasepassword,
    database: global.databaseName
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

function resetPasswordFun(student_id, callback) {
    pool.query('update  xds_users set password =? where username=?  and type!=0', ['$2b$10$Lr1h/LcKXQ2JFcgIjSfvTeSRdNKsEvo3gTGQ9sjAe8EyPIjXKNW8m', student_id], function (err, results, fields) {
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
function xdsFun(year, province, xueyuan, sort, callback) {

    if (!(sort == 'name' || sort == 'year' || sort == 'province_id' || sort == 'xueyuan') || sort === undefined)
        sort = 'student_id';

    if (xueyuan == '') {
        if (year == '' && province == '') {
            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student order by ' + sort, function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
        }
        else if (year == '') {
            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where province_id=?  order by ' + sort, [province], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
        }
        else if (province == '') {

            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where year=? order by ' + sort, [year], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });

        }
        else {
            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where year=? and province_id=? order by ' + sort, [year, province], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
        }

    }
    else {
        if (year == '' && province == '') {
            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where xueyuan=? order by ' + sort, [xueyuan], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
        }
        else if (year == '') {
            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where province_id=? and xueyuan=? order by ' + sort, [province, xueyuan], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
        }
        else if (province == '') {

            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where year=? and xueyuan=? order by ' + sort, [year, xueyuan], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });

        }
        else {
            pool.query('select  student_id,name ,year,province_id ,xueyuan from xds_student where year=? and province_id=? and xueyuan=? order by ' + sort, [year, province, xueyuan], function (err, results, fields) {
                if (err) {
                    console.log("error:" + err.message);
                }
                callback(results);
            });
        }
    }
}


// like查找id
function studentidlikeFun(student_id, callback) {

    pool.query('select student_id ,name,year,province_id from xds_student where student_id like ? ', ['%' + student_id + '%'], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


// like查找name
function studentnamelikeFun(name, callback) {

    pool.query('select student_id ,name,year,province_id from xds_student where name like ? ', ['%' + name + '%'], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

// 求所有的选调生学院，做为select的选项
function xdsXueyuanFun(callback) {

    var sqlstr = 'select distinct xueyuan from xds_student order by xueyuan desc ';
    results = null;
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


// 求所有的选调生毕业年份，做为select的选项
function xdsyearsFun(callback) {

    var sqlstr = 'select distinct year from xds_student order by year desc ';
    results = null;
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


// 求所有的选调生学号，避免重复导入
function student_idFun(callback) {

    var sqlstr = 'select student_id from xds_student ';
    results = null;
    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

// 为学生注册账号，用户名同学号,密码tongji
function regstudentFun(student_id, index, callback) {
    pool.query('insert into xds_users (id,username,password) value(?,?,?)',
        [student_id, student_id, '$2b$10$Lr1h/LcKXQ2JFcgIjSfvTeSRdNKsEvo3gTGQ9sjAe8EyPIjXKNW8m'], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(index, err);
        });
}


//直接执行sql语句
function sqlqueryFun(sqlstr, sqlparm, callback) {
    pool.query(sqlstr, sqlparm, function (err, results, fields) {
        if (err) {
            // console.log(sqlstr);
            // console.log(sqlparm);
            console.log("error:" + err.message);
        }
        callback(results);
    });
}


//求所有事件的年份
function eventyearsFun(callback) {
    var sqlstr = 'select distinct year from xds_event order by year; ';
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

    pool.query('select * from xds_student where student_id =?', [student_id], function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });

}

//按学号删除选调生
function delstudentFun(student_id, callback) {

    //改为直接删除学生用户账号，利用外键级联删除特性直接删除学生
    var sqlstr = util.format('delete from xds_users where id = "%s"', student_id);
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
        [body.name, body.year, student_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}


//修改选调生照片
function updatephotoFun(student_id, photofile, callback) {


    pool.query('update xds_student set photofile=? where student_id=?',
        [photofile, student_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });

}

//删除选调生照片
function deletephotoFun(student_id, callback) {

    pool.query('update xds_student set photofile ="" where student_id=?', [student_id],function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });

}


//按学号查询选调生职位信息
function careerFun(student_id, callback) {

    var sqlstr = util.format('select * from xds_career where student_id = "%s" order by start_time', student_id);
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
function delcareerFun(career_id, callback) {

    var sqlstr = util.format('delete from xds_career where  career_id="%d"', career_id);

    pool.query(sqlstr, function (err, results, fields) {
        if (err) {
            console.log("error:" + err.message);
        }
        callback(results);
    });
}

//修改选调生信息
function updatecareerFun(student_id, body, callback) {

    pool.query('update xds_career set start_time =?, end_time=?,unit=?,position=?,level=? where student_id=? and career_id=?',
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
        pool.query('select * from xds_comment where state!=2 order by state asc, timestamp desc limit 500', function (err, results, fields) {
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


//按年份和省份查询选调生事件信息
function eventFun(year, province, callback) {

    var sqlstr = '';
    if (year == '' && province == '') {
        sqlstr = 'select  * from xds_event order by start_date';
    }
    else if (year == '') {
        sqlstr = util.format('select * from xds_event where province_id=%d order by start_date', province);
    }
    else if (province == '') {
        sqlstr = util.format('select * from xds_event  where year=%d order by start_date', year);
    }
    else {
        sqlstr = util.format('select  * from xds_event where year=%d and province_id=%d order by start_date', year, province);
    }

    pool.query(sqlstr, function (err, results, fields) {
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

//重命名文件 
function updatefilenameFun(file_id, newname, callback) {

    pool.query('update xds_eventfile set filename=? where file_id=?',
        [newname, file_id], function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}



//导出学生 
function exportstudentFun(callback) {

    pool.query('select * from xds_student',
        function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}

//导出学career
function exportcareerFun(callback) {

    pool.query('select S.student_id ,S.name,S.year,S.province_id,C.start_time,C.end_time,C.unit,C.position,C.level from xds_career as C  left join xds_student as S on C.student_id = S.student_id order by S.student_id;',
        function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}



//导出event
function exporteventFun(callback) {

    pool.query('select e.year,e.province_id,e.start_date,e.title,e.content,f.filename from xds_event as e left join xds_eventfile as f on e.event_id=f.event_id',
        function (err, results, fields) {
            if (err) {
                console.log("error:" + err.message);
            }
            callback(results);
        });
}


exports.resetPasswordFun = resetPasswordFun;

exports.connect = connectServer;
exports.regFun = regFun;
exports.loginFun = loginFun;
exports.updatepasswordFun = updatepasswordFun;

exports.xdsFun = xdsFun;
exports.xdsyearsFun = xdsyearsFun;
exports.xdsXueyuanFun = xdsXueyuanFun;

exports.studentidlikeFun = studentidlikeFun;

exports.studentnamelikeFun = studentnamelikeFun;

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
exports.eventyearsFun = eventyearsFun;
exports.eventFun = eventFun;

exports.addfileFun = addfileFun;
exports.eventfileFun = eventfileFun;
exports.deleventfile = deleventfile;
exports.updatefilenameFun = updatefilenameFun;

exports.student_idFun = student_idFun;
exports.regstudentFun = regstudentFun;
exports.sqlqueryFun = sqlqueryFun;

exports.exportstudentFun = exportstudentFun;
exports.exportcareerFun = exportcareerFun;
exports.exporteventFun = exporteventFun;
