/**
 * 简单的JS版输入法，拿来玩玩还而已，没有多大实际使用意义
 * simple-input-method.js
 */
var SimpleInputMethod = {
    hanzi: '',
    // 候选汉字
    pinyin: '',
    // 候选拼音
    result: [],
    // 当前匹配到的汉字集合
    pageCurrent: 1,
    // 当前页
    pageSize: 5,
    // 每页大小
    pageCount: 0,
    // 总页数
    /**
    * 初始化字典配置
    */
    initDict: function () {
        var dict = pinyinUtil.dict;
        if (!dict.py2hz) throw '未找到合适的字典文件！';
        // 这一步仅仅是给字母a-z扩充，例如根据b找不到相关汉字，就把bi的结果赋值给b
        // 当然这种方式只是很简单的实现，真正的拼音输入法肯定不能这么简单处理
        dict.py2hz2 = {};
        dict.py2hz2['i'] = 'i'; // i比较特殊，没有符合的汉字，所以特殊处理
        for (var i = 97; i <= 123; i++) {
            var ch = String.fromCharCode(i);
            if (!dict.py2hz[ch]) {
                for (var j in dict.py2hz) {
                    if (j.indexOf(ch) == 0) {
                        dict.py2hz2[ch] = dict.py2hz[j];
                        break;
                    }
                }
            }
        }
    },
    /**
    * 初始化DOM结构
    */
    initDom: function () {
        var parentdiv = $('<div></div>');        //创建一个父div
        parentdiv.attr('id', 'simle_input_method');        //给父div设置id
        parentdiv.attr('class', 'simple-input-method');    //添加css样式
        var childdiv = $('<div class = "pinyin"></div><div class="result"><ol></ol> <div class = "page-up-down"> <span class = "page-up"> ▲ </span><span class="page-down">▼</span> </div></div> ');        //创建一个子div
        /*childdiv.attr('id','child');            //给子div设置id
        childdiv.addclass('childdiv');    //添加css样式*/
        parentdiv.html(childdiv);
        var that = this;
        // 初始化汉字选择和翻页键的点击事件
        parentdiv.click(function (e) {
            var target = e.target;
            if (target.nodeName == 'LI') that.selectHanzi(parseInt(target.dataset.idx));
            else if (target.nodeName == 'SPAN') {
                if (target.className == 'page-up' && that.pageCurrent > 1) {
                    that.pageCurrent--;
                    that.refreshPage();
                } else if (target.className == 'page-down' && that.pageCurrent < that.pageCount) {
                    that.pageCurrent++;
                    that.refreshPage();
                }
            }
        });

        $(document.body).append(parentdiv);
    },
    /**
    * 初始化
    */
    init: function (inputObj, data) {
        this.initDict();
        this.initDom();
        //obj = $(inputObj);
        this._target = $('#simle_input_method');
        this._pinyinTarget = $('#simle_input_method .pinyin');
        //this._pinyinTarget = document.querySelector('#simle_input_method .pinyin');
        this._resultTarget = $('#simle_input_method .result ol');
        var that = this;
        obj = $("#"+inputObj);
        for (var i = 1; i <= obj.length; i++) {
            //obj[i].addEventListener('keydown', function(e) {
            var preventDefault = false;
            //var keyCode = e.keyCode;
            var keyCode = data.charCodeAt();
            console.log("data.charCodeAt()" + keyCode);
            if (keyCode >= 97 && keyCode <= 122) // a-z
            {
                that.addChar(String.fromCharCode(keyCode), obj);
                preventDefault = true;
            } else if (keyCode == 21024 && that.pinyin && $('#simle_input_method').css("display") == "block") // 删除键
            {
                that.delChar();
                preventDefault = true;
            } else if (keyCode >= 48 && keyCode <= 53 && that.pinyin) // 1-9
            {
                that.selectHanzi(keyCode - 48);
                preventDefault = true;
            } else if (keyCode == 32 && that.pinyin) // 空格
            {
                that.selectHanzi(1);
                preventDefault = true;
            } else if (keyCode == 33 && that.pageCount > 0 && that.pageCurrent > 1) // 上翻页
            {
                that.pageCurrent--;
                that.refreshPage();
                preventDefault = true;
            } else if (keyCode == 20013) // 切换输入法
            {
                that.hide();
                preventDefault = true;
            } else if (keyCode == 34 && that.pageCount > 0 && that.pageCurrent < that.pageCount) // 下翻页
            {
                that.pageCurrent++;
                that.refreshPage();
                preventDefault = true;
            }


            /*if (preventDefault){
            that.preventDefault();
            }*/
            //});


            obj.focus(function (event) {
                // 如果选中的不是当前文本框，隐藏输入法
                if (that._input !== this) {
                    that.hide();
                }
            });

            /*obj[i].addEventListener('focus', function() {

            // 如果选中的不是当前文本框，隐藏输入法
            if (that._input !== this){
            that.hide();
            }
            });*/
        }


    },
    /**
    * 单个拼音转单个汉字，例如输入 "a" 返回 "阿啊呵腌嗄吖锕"
    */
    getSingleHanzi: function (pinyin) {
        return pinyinUtil.dict.py2hz2[pinyin] || pinyinUtil.dict.py2hz[pinyin] || '';
    },
    /**
    * 拼音转汉字
    * @param pinyin 需要转换的拼音，如 zhongguo
    * @return 返回一个数组，格式类似：[["中","重","种","众","终","钟","忠"], "zhong'guo"]
    */
    getHanzi: function (pinyin) {
        var result = this.getSingleHanzi(pinyin);
        if (result) return [result.split(''), pinyin];
        var temp = '';
        for (var i = 0, len = pinyin.length; i < len; i++) {
            temp += pinyin[i];
            result = this.getSingleHanzi(temp);
            if (!result) continue;
            // flag表示如果当前能匹配到结果、并且往后5个字母不能匹配结果，因为最长可能是5个字母，如 zhuang
            var flag = false;
            if ((i + 1) < pinyin.length) {
                for (var j = 1, len = pinyin.length; j <= 5 && (i + j) < len; j++) {
                    if (this.getSingleHanzi(pinyin.substr(0, i + j + 1))) {
                        flag = true;
                        break;
                    }
                }
            }
            if (!flag) return [result.split(''), pinyin.substr(0, i + 1) + "'" + pinyin.substr(i + 1)];
        }
        return [[], '']; // 理论上一般不会出现这种情况
    },
    /**
    * 选择某个汉字，i有效值为1-5
    */
    selectHanzi: function (i) {
        var hz = this.result[(this.pageCurrent - 1) * this.pageSize + i - 1];
        if (!hz) return;
        this.hanzi += hz;
        var idx = this.pinyin.indexOf("'");
        if (idx > 0) {
            this.pinyin = this.pinyin.substr(idx + 1);
            this.refresh();
        } else // 如果没有单引号，表示已经没有候选词了
        {
            //this._input.value += this.hanzi;
            var oldInput = this._input.val()== undefined ? "" : this._input.val();
            this._input.val(oldInput + this.hanzi);
            //console.log("input id=" + this._input.attr("id") + "; old=" + oldInput + "  value=" + this._input.value);
            this.hide();
        }
    },
    /**
    * 将拼音转换成汉字候选词，并显示在界面上
    */
    refresh: function () {
        var temp = this.getHanzi(this.pinyin.replace(/'/g, ''));
        this.result = temp[0];
        this.pinyin = temp[1];
        var count = this.result.length;
        this.pageCurrent = 1;
        this.pageCount = Math.ceil(count / this.pageSize);
        this._pinyinTarget.html(this.hanzi + this.pinyin);
        this.refreshPage();
    },
    refreshPage: function () {
        var temp = this.result.slice((this.pageCurrent - 1) * this.pageSize, this.pageCurrent * this.pageSize);
        var html = '';
        var i = 0;
        temp.forEach(function (val) {
            html += '<li data-idx="' + (++i) + '">' + val + '</li>';
        });
        /*this._target.querySelector('.page-up').style.opacity = this.pageCurrent > 1 ? '1' : '.3';
        this._target.querySelector('.page-down').style.opacity = this.pageCurrent < this.pageCount ? '1' : '.3';*/
        this._target.children(".page-up").css({ "opacity": this.pageCurrent > 1 ? '1' : '.3' });
        this._target.children(".page-down").css({ "opacity": this.pageCurrent < this.pageCount ? '1' : '.3' });
        this._resultTarget.html(html);
    },
    addChar: function (ch, obj) {
        if (this.pinyin.length == 0) // 长度为1，显示输入法
        {
            this.show(obj);
        }
        this.pinyin += ch;
        this.refresh();
    },
    delChar: function () {
        if (this.pinyin.length <= 1) {
            this.hide();
            return;
        }
        this.pinyin = this.pinyin.substr(0, this.pinyin.length - 1);
        this.refresh();
    },
    show: function (obj) {
        var pos = GetPosition(obj);
        this._target.css({ "top": (pos.x+34)  + 'px' });
        this._target.css({ "left":pos.y+ 'px' });
        //console.info(pos.x + "," + pos.y + "click");
        this._input = obj;
        this._target.css({ "display": "block" });
    },
    hide: function () {
        this.reset();
        this._target.css({ "display": "none" });
    },
    reset: function () {
        this.hanzi = '';
        this.pinyin = '';
        this.result = [];
        this.pageCurrent = 1;
        this.pageCount = 0;
        this._pinyinTarget.html('');
    }
};
function GetScreenPosition(object) {
    var position = {};
    /*position.x = object.offsetLeft;
    position.y = object.offsetTop;*/
    position.x = $("#" + object).offset().top;
    position.y = $("#" + object).offset().left;
    while (object.offsetParent) {
        position.x = position.x + object.offsetParent.offsetLeft;
        position.y = position.y + object.offsetParent.offsetTop;
        if (object == document.getElementsByTagName("body")[0]) {
            break;
        }
        else {
            object = object.offsetParent;
        }
    }
    return position;
}
function GetPosition(obj){
    var position = {};
    position.x = $(obj).offset().top;
    position.y = $(obj).offset().left;
    return position;
}
