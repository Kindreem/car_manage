$(function () {
    var co
    $.ajax({
        type: 'post',
        url: '/count',
        success: function (re) {
            // console.log(res)
            // 调用分页功能 [ 基础版 ]
            Helper.ui.page("#page-1", {
                total: re.data,
                pageSize: 6,
                showTotal: true,
                showTo: true,
                currentPage: 1,
                change: function (i) {
                    // console.log(i)
                    var index = (i - 1) * 6
                    console.log(index)
                    $.ajax({
                        type: 'post',
                        url: '/skip',
                        data: {
                            index: index
                        },
                        success: function (res) {
                            // console.log(res)
                            // clearInterval(t)
                            co = res
                            timeO(res)
                            // var t = setInterval(() => {
                            //     timeO(res)
                            //     if (co != 1) {
                            //         co = 1
                            //         clearInterval(t)
                            //     }
                            // }, 40000);

                        },
                        error: function (jqXHR) {
                            $('.modal-body').text(res.message)
                            $('.modal').modal('show').on('hidden.bs.modal', function () {
                                if (res.message == '查询失败') {
                                    location.href = 'index.html'
                                }
                            })
                        }
                    })
                }
            });

        },
        error: function (jqXHR) {
            $('.modal-body').text(res.message)
            $('.modal').modal('show').on('hidden.bs.modal', function () {
                if (res.message == '查询失败') {
                    location.href = 'index.html'
                }
            })
        }
    })



    var timeO = function (res) {
        var data = []
        for (let i = 0; i < res.data.length; i++) {
            var date1 = res.data[i].time; //开始时间
            var date2 = new Date(); //结束时间
            // console.log(res.data)
            var date3 = date2.getTime() - new Date(date1).getTime(); //时间差的毫秒数      
            //计算出相差天数
            var days = Math.floor(date3 / (24 * 3600 * 1000))

            //计算出小时数

            var leave1 = date3 % (24 * 3600 * 1000) //计算天数后剩余的毫秒数
            var hours = Math.floor(leave1 / (3600 * 1000))
            //计算相差分钟数
            var leave2 = leave1 % (3600 * 1000) //计算小时数后剩余的毫秒数
            var minutes = Math.floor(leave2 / (60 * 1000))
            //计算相差秒数
            // var leave3 = leave2 % (60 * 1000) //计算分钟数后剩余的毫秒数
            // var seconds = Math.round(leave3 / 1000)

            var long = `${days*24+hours}h${minutes}min`
            // console.log(long)
            var cardata = JSON.parse(`{"_id":"${res.data[i]._id}","name":"${res.data[i].name}","sex":"${res.data[i].sex}","age":"${res.data[i].age}","phone":"${res.data[i].phone}","number":"${res.data[i].number}","type":"${res.data[i].type}","color":"${res.data[i].color}","long":"${long}","time":"${res.data[i].time}"}`)
            data.push(cardata)
        }
        // console.log(cardata)
        // console.log(data)
        var strHtml = template('showStu', data)
        $('#tb').html(strHtml)
    }
    $.ajax({
        type: 'post',
        url: '/index',
        success: function (res) {
            console.log(res)
            // clearInterval(t)
            co = res
            timeO(res)
            // var t = setInterval(() => {
            //     timeO(res)
            //     if (co != 2) {
            //         co = 2
            //         clearInterval(t)
            //     }
            // }, 40000);

            $('.del').click(function (event) {
                event.preventDefault()
                var id = $(this).data('index')
                $.ajax({
                    type: 'post',
                    url: '/del',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: function (res) {
                        $('.modal-body').text(res.message)
                        $('.modal').modal('show').on('hidden.bs.modal', function () {
                            if (res.message == '删除成功') {
                                location.href = 'index.html'
                            }
                        })
                    },
                    error: function (jqXHR) {
                        console.log(jqXHR.status)
                    }
                })
            })
        },
        error: function (jqXHR) {
            console.log(jqXHR.status)
        }
    })


    $('#table1').on('sort.bs.table', function (e, name, order) {
         $('.helper-page-first').trigger("click")
        console.log(order)
        var sort
        if (order == 'asc') {
            order = 1
            sort = `{"${name}":"${order}"}`
        } else {
            order = -1
            sort = `{"${name}":"${order}"}`
        }
        console.log(asort)
        var asort = JSON.parse(sort)
        console.log(asort)
        $.ajax({
            type: 'post',
            url: '/sort',
            data: asort,
            success: function (res) {
                // clearInterval(t)
                co = res
                timeO(res)
                // var t = setInterval(() => {
                //     timeO(res)
                //     if (co != 3) {
                //         co = 3
                //         clearInterval(t)
                //     }
                // }, 40000);

            },
            error: function (jqXHR) {
                $('.modal-body').text(res.message)
                $('.modal').modal('show').on('hidden.bs.modal', function () {
                    if (res.message == '查询失败') {
                        location.href = 'index.html'
                    }
                })
            }
        })
    });

    $('#findN').click(function (event) {
        event.preventDefault()
        $.ajax({
            type: 'post',
            url: '/findName',
            data: {
                searchName: $('#search').val()
            },
            success: function (res) {
                // clearInterval(t)
                co = res
                timeO(res)
                // if (co != 4) {
                //     co = 4
                //     clearInterval(t)
                //     var t = setInterval(() => {
                //         timeO(res)

                //     }, 40000);
                // } else {

                // }


            },
            error: function (jqXHR) {
                $('.modal-body').text(res.message)
                $('.modal').modal('show').on('hidden.bs.modal', function () {
                    if (res.message == '查询失败') {
                        location.href = 'index.html'
                    }
                })
            }
        })
    })
    setInterval(() => {
        // console.log(co)
        // if (co != c) {
            // clearInterval(t)
                timeO(co)
                // console.log(123)
            }, 50000);
        // }
    // }, 5000);

})