// 判断是否为IE浏览器，返回-1或者版本号
var ie = function isIE() {
    var UA = navigator.userAgent, //获取浏览器版本问题
        isIE = UA.indexOf('MSIE') > -1,
        v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
    return v;
}();

console.log(ie);

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

setCookie('userName', 'Admin', '1');
delCookie('userName');
console.log(getCookie('userName'));

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