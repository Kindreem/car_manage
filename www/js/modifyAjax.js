

$.validator.addMethod('isPhone',function (value,ele) {
    var length=value.length
    var reg=/^1[34578]\d{9}$/
    if (length >= 11 && reg.test(value)){
        return true
    }
    else {
        return false
    }
})
$.validator.addMethod('isNumber',function (value,ele) {
    var length=value.length
    var reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    if (length >= 7 && reg.test(value)){
        return true
    }
    else {
        return false
    }
})
$.validator.addMethod('isSex',function (value,ele) {
    if (value=='男'||value=='女'){
        return true
    }
    else {
        return false
    }
})
$(function () {
    var url = location.href;
    var id = url.substring(url.indexOf("?")+1,url.length);
    console.log(id)
    $.ajax({
        type:'post',
        url:'/modify',
        dataType:'text',
        data:id,
        success:function (res) {
            var myData=JSON.parse(res)
            console.log(myData.data)
            var strHtml=template('showOneStu',myData.data)
            $('#carOne').html(strHtml)

            $('#modifyBtn').click(function (event) {
                $('#modifyForm').validate({
                    debug:true,
                    rules:{
                        name:{
                            required:true,
                            minlength:2
                        },
                        sex:{
                            required:true,
                            isSex:true
                        },
                        age:{
                            required:true
                        },
                        phone:{
                            required:true,
                            isPhone:true
                        },
                        number:{
                            required:true,
                            isNumber:true
                        },
                        type:{
                            required:true
                        },
                        color:{
                            required:true
                        }
                    },
                    messages:{
                        name:{
                            required:'姓名不能为空',
                            minlength:'姓名不能少于3位'
                        },
                        sex:{
                            required:'性别不能为空',
                            isSex:'请输入男或女'
                        },
                        age:{
                            required:'年龄不能为空'
                        },
                        phone:{
                            required:'手机号不能为空',
                            isPhone:'手机号格式错误'
                        },
                        number:{
                            required:'车牌不能为空',
                            isNumber:'车牌格式错误'
                        },
                        type:{
                            required:'车型不能为空'
                        },
                        color:{
                            required:'颜色不能为空'
                        }
                    },
                    submitHandler:function (form) {
                        var id = url.substring(url.indexOf("?")+4,url.length);
                        $.ajax({
                            type:'post',
                            url:'/modifyStu',
                            dataType:'json',
                            data:{
                                name: $('#name').val(),
                                sex: $('#sex').val(),
                                age: $('#age').val(),
                                phone: $('#phone').val(),
                                number: $('#number').val(),
                                type: $('#type').val(),
                                color: $('#color').val(),
                                id: id
                            },
                            success:function (res) {
                                $('.modal-body').text(res.message)
                                $('.modal').modal('show').on('hidden.bs.modal',function () {
                                    if (res.message == '修改成功'){
                                        location.href='index.html'
                                    }
                                })
                            },
                            error:function (jqXHR) {
                                console.log(jqXHR.status)
                            }
                        })
                    },

                })
            })
        },
        error:function (jqXHR) {
            console.log(jqXHR.status)
        }
    })

})

