$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage

    // 2.1定义时间过滤器
    template.defaults.imports.dataForma = function (date) {
        var dt = new Date(date)

        var n = dt.getFullYear()
        var y = PadZero(dt.getMonth() + 1)
        var r = PadZero(dt.getDate())

        var s = PadZero(dt.getHours())
        var f = PadZero(dt.getMinutes())
        var m = PadZero(dt.getSeconds())

        return n + '-' + y + '-' + r + " " + s + ':' + f + ":" + m

    }
    // 2.2数字补0
    function PadZero(n) {
        return n > 10 ? n : '0' + n
    }

    // 1.当请求数据脚多的时侯，我们可以定义一个查询的
    // 参数对象q
    var q = {
        pagenum: 1, //默认请求其一条的数据
        pagesize: 2, // 每页显示几条数据
        cate_id: "", //文章分类的Id
        state: '',//文章的发布状态
    }
    // 2.渲染列表区域
    initTable()
    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用模板，渲染
                var strHtml = template('tpl-table', res)
                $('tbody').html(strHtml)
                //  渲染分页
                renderPage(res.total)
            }
        })
    }

    // 3.渲染下拉菜单
    initCate()
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                // 调用模板
                var strHtml = template('tpl-cate', res)
                $('[name=cate_id]').html(strHtml)
                // 调用这个方法，不渲染不出来
                form.render()
            }
        })
    }

    // 4.筛选功能
    $('#form-search').on('submit', function (e) {
        // 4.1 阻止表单默认提交时间
        e.preventDefault()
        // 4.2 ,获取表单中地值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 4.3 赋值给Q
        q.cate_id = cate_id
        q.state = state
        // 重新选人 
        initTable()
    })


    // 5.分页功能
    function renderPage(total) {
        // console.log(total);
        laypage.render({
            elem: 'pageBox', //注意，这里的 test1 是 ID，不用加 # 号
            count: total,//数据总数，从服务端得到
            limit: q.pagesize, //每页显示地数据
            curr: q.pagenum,    //设置默认选中地分页
            limits: [2, 3, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // 把最新地页码值赋值到q.pagenum
                q.pagenum = obj.curr
                // 把obj.limit赋值给q.pagesize
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    //do something
                    initTable()
                }
            }
        });
    }

    // 6.分页删除功能
    $('tbody').on('click', '.btn-delete', function () {
        var len = $('.btn-delete').length
        console.log(len);
        var id = $(this).attr('data-id')
        // console.log(id);
        // 6.1 点击探出层
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return
                    }
                    layer.msg('删除成功')
                    if (len === 1) {
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index);
        });
    })

})