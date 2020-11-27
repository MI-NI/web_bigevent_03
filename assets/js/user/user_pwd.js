$(function() {
    // 1.自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value == $('[name=oldPwd]').val()) {
                return '两次密码不能一致'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newPwd]').val()) {
                return '两次输入密码不一致'
            }
        }
    });
    // 2.提交修改密码得到表单
    var layer = layui.layer
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('密码更换成功')
            }
        })
    })
})