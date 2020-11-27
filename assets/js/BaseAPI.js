$.ajaxPrefilter(function(options) {
    options.url = "http://ajax.frontend.itheima.net" + options.url
        // 为有权限的设置接口
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }
    // 控制用户访问权限
    // 无论成功还是失败都会执行complete函数

    options.complete = function(res) {
        console.log(res);
        var obj = res.responseJSON
        if (obj.status == 1 && obj.message == "身份认证失败！") {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }
})