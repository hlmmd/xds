const code = require("svg-captcha");

var user_type = {
    admin: 0,
    assist: 1,
    student: 2
};


function user_type_string(type) {
    if (type == user_type.admin)
        return '管理员';
    else if (type == user_type.assist)
        return '助管';
    else if (type == user_type.student)
        return '学生';
    else
        return null;
}

function checklogin(req, res) {
    //  return true;
    if (req.session.islogin && req.cookies.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    else {
        return false;
    }
    return true;
}

function checklogin_student(req, res) {
    //  return true;
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    else {
        return false;
    }
    if (req.cookies.type && req.cookies.type == user_type.student) {
        // res.locals.type = req.cookies.type;
    }
    else {
        return false;
    }
    return true;
}

function checklogin_assist(req, res) {
    //  return true;
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    else {
        return false;
    }
    if (req.cookies.type && req.cookies.type == user_type.assist) {
        // res.locals.type = req.cookies.type;
    }
    else {
        return false;
    }
    return true;
}

function checklogin_admin(req, res) {
    //  return true;
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    else {
        return false;
    }
    if (req.cookies.type && req.cookies.type == user_type.admin) {
        // res.locals.type = req.cookies.type;
    }
    else {
        return false;
    }
    return true;
}

function getprovincename(province_id) {
    var str = global.provinces;
    if (province_id < 0 || province_id >= str.length)
        return '未知';
    return str[province_id];
}

function stripscript(s) {
    //var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
    var pattern = new RegExp("[`'\"]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

function Datetoyyyymmdd(mysqldate) {
    var date = new Date(mysqldate);
    var res = date.getFullYear() + '-';
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    if (mm <= 9)
        res += '0';
    res += mm + '-';
    if (dd <= 9)
        res += '0';
    res += dd;
    return res;
}

function endgestart(start_time, end_time) {
    var date1 = new Date(start_time);
    var date2 = new Date(end_time);
    return date1.getTime() <= date2.getTime();
}

function createCode() {

    return code.create({
        size: 4,
        ignoreChars: "0o1iIl",
        noise: 1,
        color: true,
        background: "#f0e68c",
        fontSize: 40,
        height: 40,
    });

}

exports.checklogin = checklogin
exports.checklogin_student = checklogin_student
exports.checklogin_assist = checklogin_assist
exports.checklogin_admin = checklogin_admin
exports.user_type_string = user_type_string
exports.getprovincename = getprovincename
exports.stripscript = stripscript
exports.Datetoyyyymmdd = Datetoyyyymmdd
exports.endgestart = endgestart;

exports.createCode = createCode;
