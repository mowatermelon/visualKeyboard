/**
* @show modal
* @version 4.0
* @author WU EVA
**/


    //使用本插件之前需要引用jquery.js、bootstrap.css和bootstrap.js，
    //本插件是在bootstrap modal的基础上写的一个共用模态窗插件。

var showmodal = function (options) {
    var defaults = {
        flag: "info", //设置弹出modal的状态 success:成功窗体,warning:警告窗体,info:信息窗体,default:默认无样式
        title: "提示信息",    //设置模态窗标题
        modalIndex: "01",    //设置模态窗索引值，默认只使用一次弹窗，模态窗的序号默认为01
        titleCenter: false,    //设置模态窗标题是否水平居中显示，默认为false,默认左对齐
        isText: true,  //判断传进来content的是否为Text,默认为true
        content: "提示内容",  //如果传进来content的为Text，通过修改text内容设置模态窗内容
        contentLeft: false,    //设置模态窗content是否左对齐显示，默认为false
        fontSize: "",  //如果传进来content的为Text，可以修改字体大小,默认是24px,h3大小，请输入具体像素值,例如10
        src: "",  //如果传进来content的为iframe，通过修改iframe地址来设置模态窗内容
        hideClick: true, //boolean 或 string 'static',设置点击modal遮罩层是否隐藏modal，默认为true,如果设置为'static',则点击背景模态窗不会关闭
        Tclose: true,  //设置右上角关闭按钮是否显示，默认为显示
        Bclose: true,  //设置右下角关闭按钮是否显示，默认为显示
        Qclose: false,  //设置右下角关闭按钮是否显示，默认为关闭
        Sheight: "",  //设置模态窗高度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SMaxheight: "",  //设置模态窗最高高度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SWidth: "",  //设置模态宽度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        SMaxWidth: "",  //设置模态最大宽度，请输入具体的正整数像素值，默认为auto，请输入具体的像素值，例如300
        resetajust: true, //设置是否重新计算modal的居中效果，默认为true
        callbackB: false, //确认确认按钮有没有回调函数，默认为false
        callbackQ: false, //确认取消按钮有没有回调函数，默认为false
        BcloseText: "确定", //设置右下角关闭按钮的文本内容，默认为确定
        QcloseText: "取消", //设置右下角关闭按钮的文本内容，默认为取消
        Justify: false, //设置底部按钮是否两端对齐，主要使用状态在底部有两个按钮，希望一左一右的显示，默认为false
        isZoom: false, //设置头部按钮全屏按钮是否显示，默认为false
        /**
        * 初始化DOM结构
        */
        initDom: function () {
            var parentdiv = "<div class='modal fade show_Modal' id='showModal" + this.modalIndex + "'><div class='modal-dialog'>";        //创建一个modaldiv
            var headerdiv;
            if (this.Tclose && this.titleCenter) {
                headerdiv = "<div class='header text-center bg-" + this.flag + "' ><button type='button' id='Tclose' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button><span class='modal-title' id='showLabel'>" + this.title + "</span>";        //创建headerdiv
            } else if (this.Tclose && !this.titleCenter) {
                headerdiv = "<div class='header bg-" + this.flag + "'><button type='button' class='close' id='Tclose'  data-dismiss='modal' aria-hidden='true'>&times;</button><span class='modal-title' id='showLabel'>" + this.title + "</span>";
            } else if (!this.Tclose && this.titleCenter) {
                headerdiv = "<div class='header text-center bg-" + this.flag + "'><span class='modal-title' id='showLabel'>" + this.title + "</span>";        //创建headerdiv
            }
            else if (!this.Tclose && !this.titleCenter) {
                headerdiv = "<div class='header bg-" + this.flag + "'><span class='modal-title' id='showLabel'>" + this.title + "</span>";        //创建headerdiv
            }
            if (this.isZoom) {
                headerdiv += "<button id='btn-zoom' class='btn btn-info pull-right glyphicon glyphicon-zoom-in'></button></div>\n";
            } else {
                headerdiv += "</div>\n";
            }
            var contentdiv;
            if (this.isText) {
                if (this.contentLeft) {
                    contentdiv = "<div class='modal-body text-left h3 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv
                } else {
                    contentdiv = "<div class='modal-body text-center h3 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv                    
                }
            } else {
                contentdiv = "<div class='modal-body text-center h3 bg-faded'><iframe src='" + this.src + "' id='modalIframe' name= 'modal_Iframe'></div>\n";        //创建contentdiv  
            }

            var footerdiv = "";
            if (this.Bclose && this.Qclose) {
                if (this.Justify) {
                    footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='col-xs-6 r-b-1 btn btn-default' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='col-xs-6 btn btn-default' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button></div>";        //创建footerdiv                   
                } else {
                    footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-" + this.flag + "' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='btn btn-default' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button></div>";        //创建footerdiv
                }
            } else if (!this.Bclose && this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-default' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button></div>";        //创建footerdiv                
            } else if (this.Bclose && !this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-block btn-link' data-dismiss='modal' id='close'>" + this.BcloseText + "</button></div>";        //创建footerdiv                
            } else if (!this.Bclose && !this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'></div>";        //创建footerdiv                
            }
            parentdiv = parentdiv + headerdiv + contentdiv + footerdiv + "</div></div>";
            $(document.body).append(parentdiv);
            var _this = this;
            $("#showModal" + this.modalIndex).modal({ keyboard: false, backdrop: _this.hideClick });
        },
        /**
        * 初始化
        */
        init: function () {
            this.initDom();
            this.initCss();
            this.initFunction();
        },
        /**
        * 绑定事件
        */
        initCss: function () {
            $(".show_Modal.modal .modal-dialog .modal-body").css({ "background-color": "#fff" });
            $(".show_Modal.modal .modal-dialog  .header .modal-title,.show_Modal.modal .modal-dialog .header .close").css({ "font-size": "20px", "line-height": "40px", "padding-left": "20px", "padding-right": "20px" });
            $(".show_Modal.modal .modal-dialog .header .glyphicon").css({ "line-height": "25px" });
            $(".show_Modal.modal .modal-dialog  .header").css({ "border-radius": "15px 15px 0 0", "border-bottom": "1px solid #e5e5e5" });
            $(".show_Modal.modal .modal-dialog  .header.bg-info").css({ "box-shadow": "rgb(53, 172, 197) 0px 3px 8px 1px inset" });
            $(".show_Modal.modal .modal-dialog .modal-footer").css({ "margin-top": "0px", "border-radius": "0 0 15px 15px", "padding": "5px 20px 5px" });
            $(".show_Modal.modal .modal-dialog .modal-footer .btn-link").css({ "font-size": "18px" });
            //判断modalbody是否为文本类型
            if (!this.isText) {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body #modalIframe").css({ "border": "0 none #eee", "width": "100%", "margin": "0 auto", "height": "99%" });
            }
            //判断是否需要重新设置模态窗宽度
            if (this.SWidth != "") {
                var m_top = $("#showModal" + this.modalIndex).css("margin-top");
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "width": this.SWidth + "px" });


            }
            //判断是否需要重新设置模态窗高度
            if (this.Sheight != "") {
                //$(".show_Modal.modal,.show_Modal.modal .modal-dialog").css({ "height": this.Sheight + "px" });
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "height": this.Sheight + "px" });

            }

            //判断是否需要重新设置模态窗宽度
            if (this.SMaxWidth != "") {
                var m_top = $("#showModal" + this.modalIndex).css("margin-top");
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "max-width": this.SMaxWidth + "px" });


            }
            //判断是否需要重新设置模态窗高度
            if (this.SMaxheight != "") {
                //$(".show_Modal.modal,.show_Modal.modal .modal-dialog").css({ "height": this.Sheight + "px" });
                if (!this.isText) {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-body iframe").css({ "max-height": this.SMaxheight + "px" });
                } else {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "max-height": this.SMaxheight + "px" });
                }

            }
            //判断是否需要重新设置模态窗body字体大小
            if (this.fontSize != "") {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").removeClass("h3").css({ "font-size": this.fontSize + "px" });
            } else {
                if (!$("#showModal" + this.modalIndex + " .modal-dialog .modal-body").hasClass("h3")) {
                    $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").addClass("h3")
                }
            }

            //判断是否需要重新设置模态窗body是否包含img标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("img").length > 0) {
                this.moveModal();
                var cHeight = $("#showModal" + this.modalIndex).height();
                var cWidth = $("#showModal" + this.modalIndex).width();
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "min-width": cWidth * 0.6 });
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "max-height": cHeight * 0.7, "overflow": "auto" });
            } else {
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "min-width": "auto" });
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "max-height": "auto", "overflow-x": "hidden" });
            }

            //判断是否需要重新设置模态窗body是否包含iframe标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("iframe").length > 0) {
                this.moveModal();
            }

            //判断是否需要重新设置模态窗body是否包含div标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("div").length > 0) {
                this.moveModal();
            }
            //判断是否重新计算modal的居中效果
            if (this.resetajust) {
                //console.log("重新设置居中啦");
                this.ajustdialog();
            }
            $("button.col-xs-6").css({ "border": "0 none", "border-radius": "0", "margin": 0 });
            $(".r-b-1").css({ "border-right": "1px solid #999" });
            $(".modal-body.text-left").css({ "text-indent": "2em", "word-wrap": "break-word" });

        },
        initFunction: function () {
            var _this = this;
            $("#showModal" + _this.modalIndex + " #close").click(function (event) {
                if (_this.callbackB && _this.Bclose) {
                    if (!_this.callbackBF()) {
                        _this.cancelFlow(event);
                        return;
                    }
                }

            });
            $("#showModal" + _this.modalIndex + " #bcancel").click(function (event) {
                if (_this.callbackQ && _this.Qclose) {
                    if (!_this.callbackQF()) {
                        _this.cancelFlow(event);
                        return;
                    }
                }

            });

            $("#showModal" + _this.modalIndex).off('shown.bs.modal').on("shown.bs.modal", function () {
                //在模态框完全展示出来做一些动作
                $(document).off('focusin.bs.modal');
                //$(document.body).blur();
                //$("#showModal" + this.modalIndex).on('focusin.bs.modal');
                if (_this.modalIndex > 1) {
                    //console.log(_this.modalIndex);
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 0.8 });
                }
                //                if (_this.isMain) {
                //                    //$("div#header",parent.document).css({ "margin-top": "10px" });
                //                }
                _this.callbackShown();
            });
            $("#showModal" + _this.modalIndex).on("hide.bs.modal", function () {
                if (_this.modalIndex > 1) {
                    //console.log(_this.modalIndex+"hide");
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 1 });
                }
                //                if (_this.isMain) {
                //                    $("div#header", parent.document).css({ "margin-top": 0 });
                //                }
                //hide方法后调用
                $(this).remove();
                $(document.body).removeClass("modal-open");
                $("#showModal" + this.modalIndex).blur();
                _this.callbackHide();
            });

            $("#btn-zoom").click(function () {
                var _that = $(this);
                _this.moveModal();
                var d_h = document.body.clientHeight;
                var d_w = document.body.clientWidth;
                var s_h = $("#showModal" + _this.modalIndex + " .modal-dialog").height();
                var b_h = _this.Sheight.length > 0 ? _this.Sheight : $("#showModal" + _this.modalIndex + " .modal-dialog .modal-body").height();
                var s_w = _this.SWidth.length > 0 ? _this.SWidth : $("#showModal" + _this.modalIndex + " .modal-dialog").width();
                var m_t = $("#showModal" + _this.modalIndex + " .modal-dialog").css('margin-top');

                if (_that.hasClass("glyphicon-zoom-in")) {
                    _that.addClass("glyphicon-zoom-out").removeClass("glyphicon-zoom-in");
                    $("#showModal" + _this.modalIndex + " .modal-dialog").attr({ "n-height": s_h, "n-width": s_w, "n-margin": m_t }).css({ "width": d_w + "px", "margin": "0 auto", "padding": "0" });
                    $("#showModal" + _this.modalIndex + " .modal-dialog .modal-body").attr({ "n-height": b_h }).css({ "height": (d_h - 100) + "px" });
                    _this.Sheight = d_h - 100;
                    _this.SWidth = d_w;
                } else {
                    _that.addClass("glyphicon-zoom-in").removeClass("glyphicon-zoom-out");
                    s_h = $("#showModal" + _this.modalIndex + " .modal-dialog").attr("n-height");
                    s_w = $("#showModal" + _this.modalIndex + " .modal-dialog").attr("n-width");
                    b_h = parseInt($("#showModal" + _this.modalIndex + " .modal-dialog .modal-body").attr("n-height")) + 40;
                    m_t = $("#showModal" + _this.modalIndex + " .modal-dialog").attr("n-margin");
                    $("#showModal" + _this.modalIndex + " .modal-dialog").css({ "margin-top": m_t, "width": s_w + "px" });
                    $("#showModal" + _this.modalIndex + " .modal-dialog .modal-body").css({ "height": b_h + "px" });
                    _this.Sheight = b_h;
                    _this.SWidth = parseInt(s_w);
                }
                _this.zoomCallback();
            });
        },
        ajustdialog: function () {
            // 是弹出框居中。。。  
            var $modal_dialog = $("#showModal" + this.modalIndex).find('.modal-dialog');
            //获取可视窗口的高度  
            if ($("#showModal" + this.modalIndex).height() > window.screen.height - 355) {
                //$("#showModal" + this.modalIndex).height(window.screen.height - 355);
            }
            var clientHeight = $("#showModal" + this.modalIndex).height();
            var dialogHeight, m_top, isMargin;

            if (!this.isText) {
                //得到dialog的高度  
                dialogHeight = $modal_dialog.height();
                
                if (clientHeight > dialogHeight) {
                    //计算出距离顶部的高度 
                    m_top = Math.abs((clientHeight - dialogHeight) / 2);

                    if (clientHeight > 400) {
                        $modal_dialog.css({ 'margin': m_top + 'px auto'});
                    } else {
                        $modal_dialog.css({ 'margin': '0px auto' });
                        $("#showModal" + this.modalIndex).on("shown.bs.modal", function () {
                            //在模态框加载的同时做一些动作
                            $modal_dialog.css({ 'margin': '0px auto' });
                        });

                    }
                } else {
                    var cHeight = ($("#showModal" + this.modalIndex).height() < document.documentElement.clientHeight) ? $("#showModal" + this.modalIndex).height() : document.documentElement.clientHeight;
                    var cWidth = $("#showModal" + this.modalIndex).width();
                    $modal_dialog.css({ 'margin': '0px auto', "padding": "0" });
                    $modal_dialog.children(".modal-body").css({ "max-height": cHeight * 0.5, "max-width": cWidth * 0.8, "overflow": "auto" });
                }

            } else {
                //计算出距离顶部的高度 
                m_top = Math.abs((clientHeight - 180) / 2);

                if (clientHeight <= 400) {
                    $modal_dialog.css({ 'padding': m_top + 'px 0' });
                } else {
                    if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("img").length > 0) {
                        //console.log("clientHeight" + clientHeight);

                        if (clientHeight <= 700) {
                            $modal_dialog.css({ 'padding': '50px 0px 0px 0px', 'margin': 'auto' });
                        }
                        else {
                            dialogHeight = $modal_dialog.height();
                            //console.log("dialogHeight" + dialogHeight);
                            if (clientHeight > dialogHeight) {
                                $("#showModal" + this.modalIndex).on("shown.bs.modal", function () {
                                    //计算出距离顶部的高度 

                                    //在模态框加载的同时做一些动作
                                    $modal_dialog.css({ 'margin': 'auto' });
                                });
                                $modal_dialog.css({ 'margin': 'auto' });
                            } else {
                                m_top = Math.abs(clientHeight * 0.25);
                                $modal_dialog.css({ 'margin': m_top + 'px auto !important' });
                            }


                        }
                    } else {
                        //$modal_dialog.css({ 'margin': m_top + 'px auto !important' });
                        $modal_dialog.attr({"style": "margin : "+m_top + "px auto !important" });                        
                        //console.log($modal_dialog.attr("style"));
                    }

                }



            }
        },
        moveModal: function () {
            var $dialog = $("#showModal" + this.modalIndex).find('.modal-dialog');
            var $head = $dialog.children().eq(0);
            var move = {
                isMove: false,
                left: 0,
                top: 0
            };
            //委托
            //console.log('点击的是', $(this));
            $head.mousedown(function (e) {
                move.isMove = true;
                var offset = $dialog.offset();
                move.left = e.pageX - offset.left;
                move.top = e.pageY - offset.top;
            });
            $("#showModal" + this.modalIndex).mousemove(function (e) {
                if (!move.isMove) return;
                //console.log('移动的是', e.target);
                $dialog.offset({
                    top: e.pageY - move.top,
                    left: e.pageX - move.left
                });
            }).mouseup(function (e) {
                //console.log("left:"+move.left+", top:"+move.top );
                move.isMove = false;
            });


        },
        /**
        *在有确认按钮和确认有回调函数情况下的，绑定模态框点击确认之后的回调事件，
        */
        callbackBF: function () {

        },
        /**
        *在有取消按钮和取消有回调函数情况下的，绑定模态框点击确认之后的回调事件，
        */
        callbackQF: function () {

        },
        /**
        *在模态框完全展示出来调用的回调事件，
        */
        callbackShown: function () {

        },
        /**
        *在模态窗关闭之后调用的回调事件，
        */
        callbackHide: function () {

        },
        cancelFlow: function (event) {
            //阻止默认事件
            // 兼容FF和IE和Opera    
            var Event = event || window.event || e;
            if (Event && Event.preventDefault) {
                //因此它支持W3C的stopPropagation()方法
                Event.preventDefault();
                Event.stopPropagation();

            }
            else {
                //否则，我们需要使用IE的方式来取消事件冒泡 
                Event.returnValue = false;
                Event.cancelBubble = true;

                return false;
            }

        },
        closeModal: function () {
            //console.log($("#showModal" + this.modalIndex + " .modal-dialog .header #Tclose").attr("class"));
            if (this.Tclose) {
                $("#showModal" + this.modalIndex + " .modal-dialog .header #Tclose").click();
            }
        },
        zoomCallback: function () {

        }
    };
    var opts = $.extend(defaults, options);
    opts.init();
}


