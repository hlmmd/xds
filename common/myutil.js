
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
    if (req.session.islogin) {
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
    var str = ['北京市', '天津市', '上海市', '重庆市',
        '河北省', '山西省', '辽宁省', '吉林省', '黑龙江省',
        '江苏省', '浙江省', '安徽省', '福建省', '江西省',
        '山东省', '河南省', '湖北省', '湖南省', '广东省',
        '海南省', '四川省', '贵州省', '云南省', '陕西省',
        '甘肃省', '青海省', '台湾省', '内蒙古自治区',
        '广西壮族自治区', '西藏自治区', '宁夏回族自治区',
        '新疆维吾尔自治区', '香港特别行政区', '澳门特别行政区','未知'];
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

exports.checklogin = checklogin
exports.checklogin_student = checklogin_student
exports.checklogin_assist = checklogin_assist
exports.checklogin_admin = checklogin_admin
exports.user_type_string = user_type_string
exports.getprovincename = getprovincename
exports.stripscript = stripscript
exports.Datetoyyyymmdd = Datetoyyyymmdd
exports.endgestart = endgestart;