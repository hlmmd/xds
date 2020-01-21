
function checklogin(req, res) {
    if (req.session.islogin) {
        res.locals.islogin = req.session.islogin;
    }
    else {
        return false;
    }
    if (req.cookies.islogin) {
        req.session.islogin = req.cookies.islogin;
    }
    else {
        return false;
    }
    return true;
}

function getprovincename(province_id) {
    var str = ['北京市','天津市','上海市','重庆市',
    '河北省','山西省','辽宁省','吉林省','黑龙江省',
    '江苏省','浙江省','安徽省','福建省','江西省',
    '山东省','河南省','湖北省','湖南省','广东省',
    '海南省','四川省','贵州省','云南省','陕西省',
    '甘肃省','青海省','台湾省','内蒙古自治区',
    '广西壮族自治区','西藏自治区','宁夏回族自治区',
    '新疆维吾尔自治区','香港特别行政区','澳门特别行政区']
    if(province_id<0 || province_id>=str.length)
        return null;
    return str[province_id];
}

exports.checklogin = checklogin
exports.getprovincename = getprovincename
