var activeId;
var write;

function checkWrite() {
    //console.log("我要做个验证啦");
    write = $("#sectable .form-group>.col-sm-3>input:text");
    //console.log("write.length是" + write.length);
    if (write.length == 2) {
        initkey();
        keyb("第一次");
    } else if (write.length > 2) {
        //console.log("重新加载界面咯");
        initkey();
    }
    //console.log("好了验证结束了");
}

function initkey() {
    write.click(function () {
        activeId = $(this).attr('id');
        //console.log("我获取到input中id为" + activeId + "聚焦啦");
        var p = GetScreenPosition(activeId);
        console.info(activeId + p.x + "," + p.y + "click");
    });

}
function keyb(object) {
    ////console.log("action"+MAction);
    var shift = false,
    capslock = false,
    islang = false;
    var keyboard = $("#keyboard ul");
    var keys = keyboard.children("li");
    $('.letter').addClass('uppercase');
    keys.click(function (event) {
        //console.log("我要开始打字啦");
        var evebool = true;
        var $this = $(this),
        preventDefault = false,
        character = $this.html(); // If it's a lowercase letter, nothing happens to this variable

        // Shift keys
        if ($this.hasClass('left-shift')) {
            $('.letter').toggleClass('uppercase');
            console.info($this.html());
            if ($this.html() == "英") {
                islang = false;
                $this.html("中");
                $('.capslock').html("大写");

                /*$('.capslock').addClass("liDisabled");//添加disabled属性
                $('.capslock').addClass("disabled");//添加disabled属性*/
                //$('.capslock').preventDefault();
                //$('.capslock').attr("disabled","false");

                ////console.log("character.charCodeAt()" + character.charCodeAt());
            } else if ($(this).html() == "中") {
                islang = true;
                $this.html("英");
                $("#simle_input_method").css({"display":"none"});
                $('.capslock').removeClass("liDisabled");
                $('.capslock').html("小写");
                /*$('.capslock').removeClass("liDisabled"); //移除disabled属性
                $('.capslock').removeClass("disabled"); //移除disabled属性*/
                $('.letter').removeClass('uppercase');
                //console.log("character.charCodeAt()" + character.charCodeAt());
            }
            //islang = (islang === true) ? false : true;
            capslock = false;
            evebool = false;
            preventDefault = true;
            //console.log("现在是换输入法啦");
        }

        if (!islang) {
            //console.log("现在是中文输入法");
            // 初始化简单的拼音输入法
            ////console.log("现在有" + $("#" + activeId).length + "行啦啦啦啦");
            SimpleInputMethod.init(activeId, character);
            preventDefault = true;
            //console.log("现在输入完成了啦啦啦啦");

            // Delete
            if ($this.hasClass('delete') && $('#simle_input_method').css("display") == "none") {
              $("#" + activeId).focus();
            //console.info( activeinputele+"delete");
                var xhtml = $("#" + activeId).val();
            //console.info("delete"+xhtml);
                $("#" + activeId).val(xhtml.substring(0, xhtml.length - 1));
                evebool = false;
                preventDefault = true;
                //console.log("现在是中文删除啦");
            }
        } else {
            //console.log("现在是英文输入法");
            // Caps lock
            if ($this.hasClass('capslock')) {
                ////console.log("sdfsdfsfs1111111111");
                $('.letter').toggleClass('uppercase');
                shift = (shift === true) ? false : true;
                if ($this.html() == "大写") {
                    $this.html("小写");
                } else {
                    $this.html("大写");
                }
                capslock = true;
                evebool = false;
                preventDefault = true;
            }

                // Delete
            else if ($this.hasClass('delete')) {
                $("#" + object).focus();
                //console.info( activeinputele+"delete");
                var xhtml = $("#" + activeId).val();
                //console.info("delete"+xhtml);
                $("#" + activeId).val(xhtml.substring(0, xhtml.length - 1));
                evebool = false;
                preventDefault = true;
                //console.log("现在是删除啦");
            }

                // Uppercase letter
            else if ($this.hasClass('uppercase')) {
                //$this.html("大写");
                character = character.toUpperCase();
                preventDefault = true;
            }
            if (evebool) {
                if (shift === true) {
                    if (character.length === 2) {
                        character = character.substring(0, 1);
                    }
                } else {
                    if (character.length === 2) {
                        character = character.substring(1, 2);
                    } else {
                        character = character.toLowerCase();
                    }
                }

                //console.log("character" + character);
                clickkey(character);
                preventDefault = true;
                //console.log("我要打字结束啦");
            }

        }

    });


}

function clickkey(key) {
    var inputtext = $("#" + activeId).val();
    //console.log(inputtext + "," + key);
    inputtext = inputtext + key;
    $("#" + activeId).val(inputtext);
    $("#" + activeId).focus();
}
