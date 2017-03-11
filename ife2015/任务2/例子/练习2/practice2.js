function $(id) {
    return document.getElementById(id);
}
$("addbtn").addEventListener("click", function () {
    var val = function () { };
    var flag = isFunction(val);
    $("result").innerHTML = flag;
}, false)

var m = 'winm', n = 'winn';
var obj = { m: 'objm', n: 'objn' };
//函数call、apply、bind的区别
function fns() {
    console.log(this.m, this.n);
    console.log(this);
}

fns.bind(obj)();
fns.call(null);
fns.call(obj);
fns.apply(null, ["e", "r"]);
fns.apply(obj, ["e", "r"]);

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
function cloneObject(src) {
    var Result;
    switch (Object.prototype.toString.call(src)) {
        case "[object Number]":
            Result = (typeof src === "object" ? new Number(src) : parseInt(src.toString()));
            break;
        case "[object String]":
            Result = (typeof src === "object" ? new String(src) : src.toString());
            break;
        case "[object Boolean]":
            Result = (typeof src === "Boolean" ? new Boolean(src) : src);
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
            var keys = Object.keys(src);
            for (var i = 0, a; a = keys[i]; i++) {
                temp[a] = cloneObject(src[a]);
            }
            Result = temp;
            delete temp;
            delete keys;
            break;
        default:
            break;
    }
    return Result;
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "update";

console.log(abObj.a);//2
console.log(abObj.b.b1[0]);//"update"

console.log(tarObj.a);  //1
console.log(tarObj.b.b1[0]);//"hello"


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

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]


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


var str = "\"uewyreu\"";
console.log(str);

var str = "\"uewyreu\"";
str = str.replace(/"([^"]*)"/g, '“$1”');
console.log(str);


// 6、实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    for (i in arr) {
        fn(arr[i], i);
    }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output1(item) {
    console.log(item)
}
each(arr, output1);  // java, c, php, html
// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output2(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output2);  // 0:java, 1:c, 2:php, 3:html

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
// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3

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

