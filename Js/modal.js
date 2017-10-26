/**
* @show modal
* @version 4.0
* @author WU EVA
**/


    //使用本插件之前需要引用jquery.js、bootstrap.css和bootstrap.js，
    //本插件是在bootstrap modal的基础上写的一个共用模态窗插件。
    /**
    使用demo--modalbody为iframe
    $("#btn").click(function() {

    var sVsrc;
    var docname = $("#txt").find("option:selected").text();
    if (docname.length > 0) {
    sVsrc = "../../Doc/" + docname + ".htm";
    }
    showmodal({
        isText: false,
        isIframe: true,
        src: sVsrc,
        Bclose: false,
        Sheight: "300"

    });

    });

    使用demo--modalbody为text

    $("#forR").click(function() {
        showmodal({
            content: "确定吗",
            Qclose: true,
            callbackB: true,
            callbackBF:function(){
            //dosomething
        }
        });

    });
    

    使用demo--多次调用弹窗初始化
    请注意在第一次之后 重复调用弹窗的时候 
    ！！！！！一定要设置modalIndex，这样之后绑定的样式才会正常显示
    showmodal({
    	flag: "warning",
    	title: "提示信息",
    	content: "确定吗1",
    	modalIndex: "01",
    	Qclose: true,
    	callbackB: true,
    	callbackBF: function() {
    		//dosomething
    		//var _this=this;
    		//_this.closeModal();
    		showmodal({
    			flag: "info",
    			title: "提示信息",
    			modalIndex: "02",
    			content: "确定吗2",
    			Qclose: true,
    			SWidth: "300",
    			hideClick: "static",
    			fontSize: "18",
    			callbackB: true,
    			callbackBF: function() {
    				showmodal({
    					flag: "info",
    					title: "提示信息",
    					modalIndex: "03",
    					content: "确定吗3",
    					Qclose: true,
    					SWidth: "200",
    					hideClick: "static",
    					fontSize: "18"
    				});
    				return false;
    			}
    		});
    		return false;
    	}
    });

    */
var showmodal = function (options) {
    var defaults = {
        //flag: "info", //已废弃请注意，设置弹出modal的状态 success:成功窗体,warning:警告窗体,info:信息窗体,default:默认无样式
        //title: "提示标题",//已废弃请注意，设置模态窗标题,默认不显示
        isText: true,  //判断传进来content的是否为Text,默认为true
        modalIndex: "01",    //设置模态窗索引值，默认只使用一次弹窗，模态窗的序号默认为01
        content: "提示内容",  //如果传进来content的为Text，通过修改text内容设置模态窗内容
        contentLeft: false,    //设置模态窗content是否左对齐显示，默认为false
        fontSize: "",  //如果传进来content的为Text，可以修改字体大小,默认是24px,h3大小，请输入具体像素值
        isIframe: false,   //判断传进来content的是否为iframe,默认为false
        src: "",  //如果传进来content的为iframe，通过修改iframe地址来设置模态窗内容
        //Tclose: true,  //已废弃请注意，设置右上角关闭按钮是否显示，默认为显示
        Bclose: true,  //设置右下角关闭按钮是否显示，默认为显示
        Qclose: false,  //设置右下角关闭按钮是否显示，默认为关闭
        Sheight: "",  //设置模态窗高度，请输入具体的正整数像素值，默认为auto
        SWidth: "",  //设置模态宽度，请输入具体的正整数像素值，默认为auto
        moveHead: false, //设置通过点击模态窗head部分是否可以进行拖拽，默认为false
        hideClick: true, //boolean 或 string 'static',设置点击modal遮罩层是否隐藏modal，默认为true,如果设置为'static',则点击背景模态窗不会关闭
        callbackB: false, //确认确认按钮有没有回调函数，默认为false
        callbackQ: false, //确认取消按钮有没有回调函数，默认为false
        BcloseText: "确定", //设置右下角关闭按钮的文本内容，默认为确定
        QcloseText: "取消", //设置右下角关闭按钮的文本内容，默认为取消
        resetajust: true, //设置是否重新计算modal的居中效果，默认为true            
        /**
        * 初始化DOM结构
        */
        initDom: function () {
            var parentdiv = "<div class='modal fade show_Modal' id='showModal" + this.modalIndex + "'><div class='modal-dialog'>";
            var contentdiv;
            if (this.isText) {
                if (this.contentLeft) {
                    contentdiv = "<div class='modal-body text-left h3 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv
                } else {
                    contentdiv = "<div class='modal-body text-center h3 bg-faded'>" + this.content + "</div>\n";        //创建contentdiv                    
                }
            } else {
                contentdiv = "<div class='modal-body text-center h5 bg-faded'><iframe src='" + this.src + "' id='modalIframe'></div>\n";        //创建contentdiv  
            }

            var footerdiv = "";
            if (this.Bclose && this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-link col-xs-6' data-dismiss='modal' id='close'>" + this.BcloseText + "</button><button type='button' class='btn btn-link col-xs-6 b-l-1' data-dismiss='modal' id='bcancel'>&nbsp;&nbsp;" + this.QcloseText + "</button></div>";        //创建footerdiv
            } else if (!this.Bclose && this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-link col-xs-12' data-dismiss='modal' id='bcancel'>" + this.QcloseText + "</button></div>";        //创建footerdiv                
            } else if (this.Bclose && !this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'><button type='button' class='btn btn-link col-xs-12' data-dismiss='modal' id='close'>" + this.BcloseText + "</button></div>";        //创建footerdiv                
            } else if (!this.Bclose && !this.Qclose) {
                footerdiv = "<div class='modal-footer bg-faded'></div>";        //创建footerdiv                
            }
            //parentdiv = parentdiv + headerdiv + contentdiv + footerdiv + "</div></div>";
            parentdiv = parentdiv + contentdiv + footerdiv + "</div></div>";
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
            $("#showModal" + this.modalIndex + "  .modal-dialog .modal-body").css({ "background-color": "#fff" });
            $("#showModal" + this.modalIndex + "  div:nth-child(1) .modal-title,#showModal.modal  div:nth-child(1) .close").css({ "font-size": "20px", "color": "#fff", "line-height": "40px", "padding-left": "20px", "padding-right": "20px" });
            $("#showModal" + this.modalIndex + "  div:nth-child(1)").css({ "border-radius": "12px 12px 0 0" });
            $("#showModal" + this.modalIndex + "  .modal-footer").css({ "margin-top": "0", "border-radius": "0 0 12px 12px", "padding": "0" });
            //判断modalbody是否为文本类型
            if (!this.isText) {
                $("#showModal" + this.modalIndex + " .modal-body #modalIframe").css({ "border": "0 none #eee", "width": "100%", "margin": "0 auto", "height": "100%" });
            }
            //判断是否需要重新设置模态窗宽度
            if (this.SWidth != "") {
                var m_top = $("#showModal" + this.modalIndex).css("margin-top");
                $("#showModal" + this.modalIndex + " .modal-dialog").css({ "width": this.SWidth + "px" });


            }
            //判断是否需要重新设置模态窗高度
            if (this.Sheight != "") {
                //$("#showModal.modal,#showModal.modal .modal-dialog").css({ "height": this.Sheight + "px" });
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "height": this.Sheight + "px" });

            }
            //判断是否需要重新设置模态窗body字体大小
            if (this.fontSize != "") {
                $("#showModal" + this.modalIndex + " .modal-body").removeClass("h5").css({ "font-size": this.fontSize + "px" });
            } else {
                if (!$("#showModal" + this.modalIndex + " .modal-body").hasClass("h5")) {
                    $("#showModal" + this.modalIndex + " .modal-body").addClass("h5")
                }
            }

            //判断是否需要重新设置模态窗body是否包含img标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("img").length > 0) {
                
                var cHeight = $("#showModal" + this.modalIndex).height();
                var cWidth = $("#showModal" + this.modalIndex).width();
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "max-height": cHeight * 0.7, "max-width": cWidth * 0.8, "overflow": "auto" });
            } else {
                $("#showModal" + this.modalIndex + " .modal-dialog .modal-body").css({ "max-height": "auto", "max-width": "auto", "overflow-x": "hidden" });
            }

            //判断是否需要重新设置模态窗body是否包含iframe标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("iframe").length > 0) {
                
            }

            //判断是否需要重新设置模态窗body是否包含div标签
            if ($("#showModal" + this.modalIndex + " .modal-dialog .modal-body").children("div").length > 0) {
                
            }

            //判断是否需要重新设置模态窗高度
            if (this.resetajust) {
                this.ajustdialog();
            }
            $(".b-l-1").css({ "border-left": "1px solid #ddd","width":"47%"});
            $("button.col-xs-5").eq(0).css({ "margin-left": "5%" });
            $(".modal-body.text-left").css({ "text-indent": "2em", "word-wrap": "break-word" });
        },
        initFunction: function () {
            var _this = this;
            $("#showModal" + _this.modalIndex + " #close").click(function () {
                if (_this.callbackB && _this.Bclose) {
                    if (!_this.callbackBF()) {
                        _this.cancelFlow();
                        return;
                    }
                }

            });
            $("#showModal" + _this.modalIndex + " #bcancel").click(function () {
                if (_this.callbackQ && _this.Qclose) {
                    if (!_this.callbackQF()) {
                        _this.cancelFlow();
                        return;
                    }
                }

            });

            $("#showModal" + _this.modalIndex).off('shown.bs.modal').on("shown.bs.modal", function () {
                //在模态框完全展示出来做一些动作
                //$(document).off('focusin.bs.modal');
                //$(document.body).blur();
                //$("#showModal" + this.modalIndex).on('focusin.bs.modal');
                if (_this.modalIndex > 1) {
                    //console.log(_this.modalIndex);
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 0.8 });
                }
                _this.callbackShown();
            });
            $("#showModal" + _this.modalIndex).on("hide.bs.modal", function () {
                if (_this.modalIndex > 1) {
                    //console.log(_this.modalIndex+"hide");
                    $("#showModal0" + (_this.modalIndex - 1) + " .modal-dialog").css({ "opacity": 1 });
                }
                //hide方法后调用
                $(this).remove();
                $(document.body).removeClass("modal-open");
                $("#showModal" + this.modalIndex).blur();
                _this.callbackHide();
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
        cancelFlow: function () {
            //阻止默认事件
            // 兼容FF和IE和Opera    
            var Event = event || window.event;
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
            //console.log($("#showModal" + this.modalIndex + " .modal-dialog div:nth-child(1) #Tclose").attr("class"));
            //                if(this.Tclose){
            //                    $("#showModal" + this.modalIndex + " .modal-dialog div:nth-child(1) #Tclose").click();                
            //                }
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
                        $modal_dialog.css({ 'margin': m_top + 'px auto' });
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
                //m_top = $modal_dialog.css('margin-top');

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
        }
    };
    var opts = $.extend(defaults, options);
    opts.init();
}


