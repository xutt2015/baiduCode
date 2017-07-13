function $(id) {
    return document.getElementById(id);
}
// 1、判断arr是否为一个数组，返回一个bool值
function isArray(object) {
    //instanceof,存在跨域问题
    console.log(object instanceof Array);
    //constructor
    console.log(object.constructor == Array);
    console.log(object && typeof object === 'object' && Array == object.constructor);
    //特性判断法
    console.log(object && typeof object === 'object' &&
        typeof object.length === 'number' &&
        typeof object.splice === 'function' &&
        //判断length属性是否是可枚举的 对于数组 将得到false  
        !(object.propertyIsEnumerable('length')));

    console.log(Object.prototype.toString.call(object) === '[object Array]')
    return Object.prototype.toString.call(object) === '[object Array]';
}

// 2、判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    //可实现，不稳定
    console.log(typeof fn == 'function');

    console.log(!!fn && !fn.nodename && fn.constructor != String && fn.constructor != RegExp && fn.constructor != Array && /function/i.test(fn + ""));

    console.log(fn.prototype.toString.call(fn) == '[object Function]');
    return fn.prototype.toString.call(fn) == '[object Function]';
}

// 3、使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function copy(obj){
    return JSON.parse(JSON.stringify(obj));//也是一种深拷贝的方法
}
function cloneObject(src) {
    var Result;
    switch (Object.prototype.toString.call(src)) {
        case "[object Number]":
        Result = (typeof src === "object" ? new Number(src) : Number(src.toString()));
        break;
        case "[object String]":
        Result = (typeof src === "string" ? new String(src) : src.toString());
        break;
        case "[object Boolean]":
        Result = (typeof src === "boolean" ? new Boolean(src) : src);
        break;
        case "[object Date]":
        Result = new Date(src);
        break;
        case "[object Array]":
        var temp = new Array();
            // Array.prototype.push.apply(temp,src);
            // 当使用for(var i=0,a;a = src[i++];) i会在a被赋值后就自动增加而不是
            // 等到一个循环完成再增加
            for (var i = 0, a; a = src[i]; i++) {
                //法一
                temp.push(cloneObject(a));
                //法二
                //temp[i] = cloneObject(a);
            }
            Result = temp;
            delete temp;
            break;
            case "[object Object]":
            var temp = {};
            // keys 为对象src的键名字数组
            // 它是数组！！！
            for (var key in src) {
                temp[key] = cloneObject(src[key]);
            }
            Result = temp;
            delete temp;
            break;
            default:
            break;
        }
        return Result;
    }

//4、 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var obj = {}
    var temp = [];
    for (i in arr) {
        if (obj[arr[i]] == null) {
            obj[arr[i]] = arr[i];
            temp.push(arr[i]);
        }
    }
    return temp;
}


//5、正则表达式去除字符串中空格:  
var str = '  lo ve  ';
//去除所有空格:   
str = str.replace(/\s+/g, "");
console.log(str);
var str = '  lo ve  ';
//去除两头空格:   
str = str.replace(/^\s+|\s+$/g, "");
console.log(str);
var str = '  lo ve  ';
//去除左空格：
str = str.replace(/^\s*/g, "");
console.log(str);
var str = '  lo ve  ';
//去除右空格：
str = str.replace(/(\s*$)/g, "");
console.log(str);


// 6、实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (i in arr) {
        fn(arr[i], i);
    }
}

// 7、获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {
    //法一
    //return Object.keys(obj).length;
    //法二
    var n = 0;
    for (i in obj) {
        n++;
    }
    return n;
}
// 判断是否为邮箱地址
function isEmail(emailStr) {
    //var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    //\w=[a-zA-Z0-9]
    var reg = /^(\w+[-_.]?)*\w+@(\w+[-_.]?)*\w+\.\w{2,3}$/;
    console.log(reg.test(emailStr));
}
var value = "-xxxxxx@qq.com";
isEmail(value);
// 判断是否为手机号
function isMobilePhone(phone) {
    // var reg =/^1\d{10}$/;
    var reg = /^1[34578]\d{9}$/;
    console.log(reg.test(phone));
}
var tel = "14111111112";
isMobilePhone(tel);

//判断是否已存在该类
function hasClass(element, className) {//首先判断elment有没有这个样式    
    var classNames = element.className;
    if (!classNames) { return false; }
    classNames = classNames.split(/\s+/);
    for (var i = 0, len = classNames.length; i < len; i++) {
        if (classNames[i] === className)
            { return true; }
    }
    return false;
}
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    if (!hasClass(element, newClassName)) {
        // 法一
        element.className += " " + newClassName;
        // 法二 element.setAttribute("class", newClassName);
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    if (hasClass(element, oldClassName)) {
        element.removeAttribute("class", oldClassName);
        //element.className.replace(oldClassName,"11"); 不可用
    }
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    console.log(element.parentNode === siblingNode.parentNode);
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    var x = 0;
    var y = 0;
    var current = element;
    while (current != null) {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent;
    }
    var scrollLeft = document.documentElement.scrollLeft + document.body.scrollLeft;//html的scrollLeft+body的scrollLeft
    var scrollTop = document.documentElement.scrollTop + document.body.scrollTop;
    x -= scrollLeft;
    y -= scrollTop;
    console.log({ x: x, y: y });
    return { x: x, y: y };
}

function VQuery(selector, root) {
    //用来保存选择的元素
    var elements = []; //保存结果节点数组
    var allChildren = null; //用来保存获取到的临时节点数组
    root = root || document; //若没有给root，赋值document
    switch (selector.charAt(0)) {
        case "#": //id选择器
        elements.push(root.getElementById(selector.substring(1)));
        break;
        case ".": //class选择器
            if (root.getElementsByClassName) { //标准
                elements = root.getElementsByClassName(selector.substring(1));
            } else { //兼容低版本浏览器
                var reg = new RegExp("\b" + selector.substring(1) + "\b");
                allChildren = root.getElementsByTagName("*");
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (reg.test(allChildren[i].className)) {
                        elements.push(allChildren[i]);
                    }
                }
            }
            break;
        case "[": //属性选择器

        if (selector.indexOf("=") === -1) {
                //只有属性没有值的情况
                allChildren = root.getElementsByTagName("*");
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        elements.push(allChildren[i]);
                    }
                }
            } else {
                //既有属性又有值的情况
                var index = selector.indexOf("="); //缓存=出现的索引位置。
                allChildren = root.getElementsByTagName("*");
                for (var i = 0, len = allChildren.length; i < len; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, index)) === selector.slice(index + 1, -1)) {
                        elements.push(allChildren[i]);
                    }
                }
            }
            break;
        default: //tagName
        elements = root.getElementsByTagName(selector);
    }
    return elements
}
function trim(selector) {
    return selector.replace(/^\s+|\s+$/g, "");
}
/**
 * 模仿jQuery的迷你$选择符。
 * @param   {string} selector CSS方式的选择器，支持简单的后代选择器（只支持一级）
 * @returns {object} 返回获取到的第一个节点对象，后代选择器时，返回第一个对象中的第一个符合条件的对象
 */
 function $(selector) {
    //这里trim处理输入时两端出现空格的情况，支持ie9+。但是这个函数实现起来也特别简单，可以参考我task0002（-）前面有trim函数的实现。稍微修改一下，这样就没兼容性问题了。
    if (selector == document) {
        return document;
    }
    selector = trim(selector);
    //存在空格时，使用后代选择器
    if (selector.indexOf(" ") !== -1) {
        var selectorArr = selector.split(/\s+/); //分割成数组，第一项为parent，第二项为chlid。
        //遍历子，返回所有满足条件情况
        var dom = [];
        var Dom = {};
        for (var i = 0; i < selectorArr.length; i++) {
            if (i == 0) {
                dom = [];
                for (var p = 0; p < VQuery(selectorArr[i], null).length; p++) {
                    dom.push(VQuery(selectorArr[i], null)[p]);
                }
                Dom[i] = dom;
            }
            else {
                dom = [];
                var DomLength = Dom[i - 1].length;
                for (var m = 0; m < DomLength; m++) {
                    if (VQuery(selectorArr[i], Dom[i - 1][m])[0] != null) {
                        for (var p = 0; p < VQuery(selectorArr[i], Dom[i - 1][m]).length; p++) {
                            dom.push(VQuery(selectorArr[i], Dom[i - 1][m])[p]);
                        }
                        Dom[i] = dom;
                    }
                }
            }
        }
        return Dom[selectorArr.length - 1];
    } else { //普通情况,只返回获取到所有对象
        return VQuery(selector, document);
    }
}
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    for (var i = 0; i < element.length; i++) {
        //法一
        //element[i].addEventListener(event, listener, false);
        //法二 火狐、谷歌不支持
        //element[i].attachEvent('on' + event, listener); 
        //法三 通用
        if (element[i].addEventListener) {
            element[i].addEventListener(event, listener, false);//DOM2.0
        }
        else if (element[i].attachEvent) {
            element[i].attachEvent('on' + event, listener);//IE5+
        }
        else {
            element[i]['on' + event] = listener;//DOM 0
        }
    }
}
// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    for (var i = 0; i < element.length; i++) {
        //法一
        //element[0].removeEventListener(event, listener, false);
        //法二 火狐、谷歌不支持
        //element[i].detachEvent('on' + event, listener);
        //法三 通用
        if (element[i].removeEventListener) {
            element[i].removeEventListener(event, listener, false);//DOM2.0
        }
        else if (element[i].detachEvent) {
            element[i].detachEvent('on' + event, listener);//IE5+
        }
        else {
            element[i]['on' + event] = null;//DOM 0
        }
    }
}

// 实现对click事件的绑定
$.click = function addClickEvent(element, listener) {
    addEvent(element, 'click', listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, 'keydown', function (event) {
        if (event.keyCode == 13) {
            listener.call(element, event);
        }
    });
}

// 事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
        if (event.target && event.target.nodeName.toLowerCase() == tag) {//判断如果满足条件，立即调用监听
            listener.call(event.target, event);
        }
    });
}
$.delegate = delegateEvent;

// 判断是否为IE浏览器，返回-1或者版本号
var ie = function isIE() {
    var UA = navigator.userAgent, //获取浏览器版本问题
    isIE = UA.indexOf('MSIE') > -1,
    v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
    return v;
}();

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays * 24 * 60 * 60 * 1000);
    document.cookie = cookieName + "=" + escape(cookieValue) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    var arr, reg = new RegExp("(^| )" + cookieName + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return (arr[2]);
    else
        return null;
}

//法一，删除cookies,火狐不起效
//function delCookie(cookieName) {
//    var exp = new Date();
//   exp.setTime(exp.getTime() - 1* 24 * 60 * 60 * 1000);
//    var cval = getCookie(cookieName);
//    if (cval != null)
//        document.cookie = name + "=" + cookieName + ";expires=" + exp.toGMTString();
//}

//法二，删除cookies
function delCookie(cookieName) {
    var cval = getCookie(cookieName);
    if (cval != null) {
        setCookie(cookieName, "", -1);
    }
}


//封装AJAX，默认get方式 异步方式
function ajax(url, options) {

    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var urlStr = url;
    var keys = Object.keys(options.data);
    for (var i = 0; i < keys.length; i++) {
        urlStr = i == 0 ? urlStr + '?' + keys[i] + "=" + options.data[keys[i]] : urlStr + '&' + keys[i] + "=" + options.data[keys[i]];
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.status == 200) {
            options.onsuccess(xmlhttp.responseText, xmlhttp);
        } else {
            if (options.onfail) {
                options.onfail(xmlhttp);
            }
        }
    }

    xmlhttp.open("GET", urlStr, true);
    xmlhttp.send();
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function(responseText, xhr) {
            console.log(responseText);
        },
        onfail: function(xhr) {
            console.log(xhr);
        },
    }
    );


/**
 * AJAX函数封装
 * @param {string} url     请求地址（必须）
 * @param {object} options 发送请求的选项参数
 *   @config {string} [options.type] 请求发送的类型。默认为GET。
 *   @config {Object} [options.data] 需要发送的数据。
 *   @config {Function} [options.onsuccess] 请求成功时触发，function(oAjax.responseText, oAjax)。（必须）
 *   @config {Function} [options.onfail] 请求失败时触发，function(oAjax)。(oAJax为XMLHttpRequest对象)
 *
 *@returns {XMLHttpRequest} 发送请求的XMLHttpRequest对象
 */
 function ajax(url, options) {
    //1.创建ajax对象
    var oAjax = null;
    /**
     * 此处必须需要使用window.的方式,表示为window对象的一个属性.不存在时值为undefined,进入else
     * 若直接使用XMLHttpRequest,在不支持的情况下会报错
     **/
     if (window.XMLHttpRequest) {
        //IE6以上
        oAjax = new XMLHttpRequest();
    } else {
        oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //2.连接服务器
    //open(方法,url,是否异步)
    var param = ""; //请求参数。
    //只有data存在，且为对象使才执行
    var data = options.data ? options.data : -1; //缓存data
    if (typeof(data) === "object") {
        for (var key in data) { //请求参数拼接
            if (data.hasOwnProperty(key)) {
                param += key + "=" + data[key] + "&";
            }
        }
        param.replace(/&$/, ""); //去掉结尾&字符
    } else {
        param = "timestamp=" + new Date().getTime();
    }

    //3.发送请求
    var type = options.type ? options.type.toUpperCase() : "GET";
    var async = options.async ? options.async : true;
    if (type === "GET") {
        oAjax.open("GET", url + "?" + param, async);
        oAjax.send();
    } else {
        oAjax.open("POST", url, async);
        oAjax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        oAjax.send(param);
    }

    //4.接收返回
    //OnRedayStateChange事件
    oAjax.onreadystatechange = function() {
        if (oAjax.readyState === 4) {
            if (oAjax.status === 200) {
                //请求成功。形参为获取到的字符串形式的响应数据
                options.onsuccess(oAjax.responseText, oAjax);
            } else {
                //先判断是否存在请求失败函数
                //存在时，形参为XMLHttpRequest对象，便于进行错误进行处理
                if (options.onfail) {
                    options.onfail(oAjax);
                }
            }
        }
    };
    return oAjax; //发送请求的XMLHttpRequest对象
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest', {
        type: 'post',
        asnyc: false,
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function(responseText, xhr) {
            console.log(responseText);
        },
        onfail: function(xhr) {
            console.log(xhr);
        },
    }
    );
