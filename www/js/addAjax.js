$(function () {

    var time1 = new Date().format('Y-m-d H:i:s')
    // console.log(time)
    //添加表单验证方法   手机号的验证
    $.validator.addMethod('isPhone', function (value, ele) {
        var length = value.length
        var reg = /^1[34578]\d{9}$/
        if (length >= 11 && reg.test(value)) {
            return true
        } else {
            return false
        }
    })
    $.validator.addMethod('isNumber', function (value, ele) {
        var length = value.length
        var reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
        if (length >= 7 && reg.test(value)) {
            return true
        } else {
            return false
        }
    })
    $.validator.addMethod('isSex', function (value, ele) {
        if (value == '男' || value == '女') {
            return true
        } else {
            return false
        }
    })

    //对表单进行验证
    $('#addForm').validate({
        debug: true,
        //验证的规则
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            sex: {
                required: true,
                isSex: true
            },
            age: {
                required: true
            },
            phone: {
                required: true,
                isPhone: true
            },
            number: {
                required: true,
                isNumber: true
            },
            type: {
                required: true
            },
            color: {
                required: true
            }
        },
        //错误的提示信息
        messages: {
            name: {
                required: '姓名不能为空',
                minlength: '姓名不能少于2位'
            },
            sex: {
                required: '性别不能为空',
                isSex: '请输入男或女'
            },
            age: {
                required: '年龄不能为空'
            },
            phone: {
                required: '手机号不能为空',
                isPhone: '手机号格式错误'
            },
            number: {
                required: '车牌不能为空',
                isNumber: '车牌格式错误'
            },
            type: {
                required: '车型不能为空'
            },
            color: {
                required: '颜色不能为空'
            }
        },
        //正确时执行的函数
        submitHandler: function (form) {

            //ajax请求
            $.ajax({
                type: 'post',
                url: '/addStu',
                dataType: 'json',
                //表单数据序列化
                data: {
                    name: $('#name').val(),
                    sex: $('#sex').val(),
                    age: $('#age').val(),
                    phone: $('#phone').val(),
                    number: $('#number').val(),
                    type: $('#type').val(),
                    color: $('#color').val(),
                    time: time1
                },
                //ajax请求成功操作
                success: function (res) {
                    $('.modal-body').text(res.message)
                    //显示出模态框
                    $('.modal').modal('show').on('hidden.bs.modal', function () {
                        if (res.message == '添加成功') {
                            location.href = 'index.html'
                        }
                    })
                },
                //ajax请求失败操作
                error: function (jqXHR) {
                    console.log(jqXHR.status)
                }
            })

        },

    })
})