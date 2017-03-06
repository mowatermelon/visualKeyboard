
//相关按钮操作
    function DrawPage(){
            $('.form_date').datetimepicker({
                language: 'zh-CN',
                format: 'yyyy/mm/dd',
                weekStart: 1,
                startDate: '2012/06/15',
                todayBtn: 'linked',
                autoclose: 1,
                todayHighlight: 1,
                startView: 2,
                minView: 2,
                forceParse: 0
            });
}
//写cookies函数 
function SetCookie(name, value) {//两个参数，一个是cookie的名字，一个是值
  
    document.cookie = name + "=" + escape(value);
}

function getCookie(name) {//取cookies函数
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]); return null;
}

function delCookie(name) {//删除cookie
  
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval;
}


$(function () {


    setInterval(function () {


        var time = new Date();
        var year = time.getFullYear();
        var month = time.getMonth() + 1;
        var date = time.getDate();
        var day = time.getDay();
        var hour = time.getHours();
        var minutes = time.getMinutes();
        var second = time.getSeconds();


        month < 10 ? month = '0' + month : month;

        hour < 10 ? hour = '0' + hour : hour;
        minutes < 10 ? minutes = '0' + minutes : minutes;
        second < 10 ? second = '0' + second : second;
        var tmptime = year + '年' + month + '月' + date + '日' + ' ' + hour + ':' + minutes + ':' + second;

        var time = tmptime + '    星期' + '日一二三四五六'.charAt(day);
        $("#spanDate").html(time);

    }, 1000);

//    $("#btn_agree").click(function () { //单击事件
//        //获取用户名称
//        var strTxtName = encodeURI($("#txtName").val());

//        var strTxtMZ = encodeURI($("#txtMZ").val());
//        //开始发送数据
//        $.ajax
//                   ({ //请求登录处理页
//                       url: "QlrList.aspx", //
//                       dataType: "html",
//                       //传送请求数据
//                       data: { txtName: strTxtName, txtMZ: strTxtMZ },
//                       success: function (strValue) { //成功后返回的数据

//                           location.href = 'QlrList.aspx';
//                       }
//                   })
//    })


     $("#btn_backsy").click(function () { //返回首页

         $.removeCookie('userdata', null);
         $.removeCookie('cnr', null);
         $.removeCookie('wcnr', null);
         $.removeCookie('cxlx', null);
         location.href = '../../Main.aspx';
     })

     $("#btn_backsy2").click(function () { //返回首页

         $.removeCookie('userdata', null);
         $.removeCookie('cnr', null);
         $.removeCookie('wcnr', null);
         $.removeCookie('cxlx', null);
         location.href = '../../Main.aspx';
     })

})


 function timer(intDiff) {
    var time =window.setInterval(function () {
        var second = 0; //时间默认值		
        if (intDiff > 0) {
            second = Math.floor(intDiff);
        }
        else if (intDiff <= 0) {

            location.href = '../../Main.aspx';
        }
        if (second <= 9) second = '0' + second;
        $('#second_show').html('<s></s>' + second + '秒');
        intDiff--;
    }, 1000);

    return time;
 }



 function timer1(intDiff) {
     window.setInterval(function () {
         var second = 0; //时间默认值		
         if (intDiff > 0) {
             second = Math.floor(intDiff);
         }
         else if (intDiff <= 0) {
             location.href = '../../Main.aspx';
         }
         if (second <= 9) second = '0' + second;
         $('#second1_show').html('<s></s>' + second + '秒');
         intDiff--;
     }, 1000);
 }


 function voiceTip(note, second) {

     window.setTimeout(function () {

         var oHelper = new ActiveXObject("XCore.XHelper");
         if (oHelper != null) {

             oHelper.Speak(note);
         }

     }, second);
 }
function f_validate() {
    //创建表单结构
    $.metadata.setType("attr", "validate");
    var v = $("form").validate({
        debug: true,
        errorPlacement: function (lable, element) {
            if (element.hasClass("l-textarea")) {
                element.ligerTip({ content: lable.html(), target: element[0] });
            }
            else if (element.hasClass("l-text-field")) {
                element.parent().ligerTip({ content: lable.html(), target: element[0] });
            }
            else {
                lable.appendTo(element.parents("td:first").next("td"));
            }
        },
        success: function (lable) {
            lable.ligerHideTip();
            lable.remove();
        },
        submitHandler: function () {
            $("form .l-text,.l-textarea").ligerHideTip();
            alert("Submitted!")
        }
    });
    $("form").ligerForm();
    $(".l-button-test").click(function () {
        alert(v.element($("#txtName")));
    });
    //console.info( '验证结束');
}