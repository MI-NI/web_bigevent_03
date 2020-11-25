$(function() {
    // 1.点击登录和注册让相应的盒子显示
    $('#link_login').on('click', function() {
        $('.reg-box').hide()
        $('.login-box').show()
    })
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    });
    // 2.自定义验证规则
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return "两次密码不一致"
            }
        }
    });
    //3. 监听表单提交事件
    var layer = layui.layer
    $('#form_reg').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#link_login').click()
                $('#form_reg')[0].reset()
            }
        })
    });
    // 4.登录功能
    $('#form_login').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: "POST",
            url: "/api/login",
            data: $('#form_login').serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})