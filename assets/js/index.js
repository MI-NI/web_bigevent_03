$(function() {
    getUserInfo()
});
// 1.获取用户信息
function getUserInfo() {
    $.ajax({
        mothed: "GET",
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token')
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data)
        }
    });
    // 2.渲染头像和名称
    function renderAvatar(user) {
        // 渲染名字
        var name = user.username || user.nickname
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        // 渲染头像
        if (user.user_pic !== null) {
            $('.text-avatar').hide()
            $('.layui-nav-img').html(user.user_pic)
        } else {
            $('.layui-nav-img').hide()
            var first = name[0].toUpperCase()
            $('.text-avatar').html(first)
        }
    }
    // 3.实现退出功能
    $('#btnLogout').on('click', function() {
        // 弹出询问层
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = "/login.html"
            layer.close(index);
        });
    })
}