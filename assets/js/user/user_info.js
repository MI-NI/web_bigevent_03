$(function() {
    // 1.自定义验证规则
    var form = layui.form
    form.verify({
        // 昵称验证规则
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称不能超过1~6之间"
            }
        }
    });
    initUserOnfo()
        // 2.用户渲染
    function initUserOnfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return '获取数据失败'
                }
                form.val('formUserInfo', res.data)
            }
        })
    }
    // 3.实现表单重置
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserOnfo()
    });
    //4. 提交修改
    var layer = layui.layer
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败')
                }
                layer.msg("更新成功")
                window.parent.getUserInfo();
            }
        })
    })
})