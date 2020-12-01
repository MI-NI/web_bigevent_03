$(function () {
    var layer = layui.layer
    var form = layui.form

    initArtCateList()
    //1. 渲染表格
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用模板渲染
                var srtHtml = template('tpl-table', res)
                $('tbody').html(srtHtml)
            }
        })
    }

    // 2.添加类别功能一
    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        //   2.1 弹出层
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '250px'],
            content: $('#dialog-add').html()
        });
    })


    // 3.添加类别功能二

    $('body').on('submit', '#form-add', function (e) {
        // 3.1 阻止表单默认提交事件
        e.preventDefault()
        // 3.2快速拿到表单的值，推送到后台，然后渲染
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                initArtCateList()
                // 关闭层
                layer.close(indexAdd)
            }
        })
    })


    // 4.编辑功能
    var indexEdit = null
    $('tbody').on('click', '.btn-edit', function () {
        // 4.1 点击后弹出一个层
        indexEdit = layer.open({
            type: 1,
            title: '修改文章主页',
            area: ['500px', '250px'],
            content: $('#dialog-edit').html(),
        });

        // 4.2为表单填数据
        var id = $(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method: 'GET',
            url: "/my/article/cates/" + id,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                form.val('form-edit', res.data)
            }
        })
    })

    // 5.更新编辑功能里的内容

    $('body').on('submit', '#form-add', function (e) {
        // 5.1 阻止默认提交事件
        e.preventDefault()
        // 5.2 放送请求
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改成功')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })

    // 6.删除功能
    $('tbody').on('click', '.btn-delete', function () {
        var id = $(this).attr('data-id')
        // 6.1 弹出询问层
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }
                    layer.msg('删除成功')
                    initArtCateList()
                    layer.close(index);
                }
            })
        });
    })

})