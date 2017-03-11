
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

var Dom = document.getElementById("xutt");
var Dom1 = document.getElementById("result");
addClass(Dom, "testClass");
removeClass(Dom, "testClass");
isSiblingNode(Dom, Dom1);
getPosition(Dom);


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

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$(".adom .class1"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含class1的对象

// 可以通过简单的组合提高查询便利性，例如
$(".adom .class1 span"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含class1的对象


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
function clicklistener(event) {
    console.log(event.type);
}

addEvent($("#dome"), "click", clicklistener);
removeEvent($("#dome"), "click", clicklistener);

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

$.click($("#dome"), clicklistener);
addEnterEvent($("#xutt"), clicklistener);


function clickListener(event) {
    console.log(event);
}

function renderList() {
    $("#list")[0].innerHTML = '<li>new item</li>';
}

function init() {
    //each($("#list").getElementsByTagName('li'), function(item) {
    //    $.click(item, clickListener);
    //});

    $.click($("#list li"), clickListener);

    $.click($("#btn"), renderList);
}
init();


// 事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function (event) {
        if (event.target && event.target.nodeName.toLowerCase() == tag) {//判断如果满足条件，立即调用监听
            listener.call(event.target, event);
        }
    });
}
$.delegate = delegateEvent;

// 使用示例
// 还是上面那段HTML，实现对list这个ul里面所有li的click事件进行响应
$.delegate($("#list"), "li", "click", clickListener);