function $(id) {
    return document.getElementById(id);
}
//第一阶段
if (document.addEventListener) {
    $("hobby").addEventListener('keyup', showUserHobby, false);
} else if (document.attachevent) {
    $("hobby").attachEvent('onkeyup', showUserHobby, false);
} else {
    $("hobby").onkeyup = showUserHobby;
}

function showUserHobby(event) {
    $("result").innerHTML = '';
    if (event.keyCode == 13 || event.keyCode == '13') {
        var value = trim($("hobby").value);
        var valueArr = uniqArray(value.split(','));
        for (var i in valueArr) {
            var li = document.createElement("li");
            li.innerHTML = valueArr[i];
            $("result").appendChild(li);
        }
    }
}

function trim(text) {
    return text.replace(/\s+/g, '');
}

function uniqArray(arr) {
    var obj = {};
    var newArr = [];
    for (i in arr) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = arr[i];
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
//第二、三阶段
if (document.addEventListener) {
    $("hobby1_button").addEventListener('click', showUserHobby1, false);
} else if (document.attachevent) {
    $("hobby1_button").attachEvent('onclick', showUserHobby1, false);
} else {
    $("hobby1_button").onclick = showUserHobby1;
}

function showUserHobby1() {
    $("result1").innerHTML = '';
    $("confirm").innerHTML = "";
    var value = $("hobby1_input").value;
    if (value == null || value == "") {
        $("confirm").innerHTML = "爱好数量不能超过10个，也不能什么都不输入！";
        return;
    }
    var valueArr = uniqArray(value.split(/[\n , ， 、 ; \s+]/));
    if (valueArr.length > 10) {
        $("confirm").innerHTML = "爱好数量不能超过10个，也不能什么都不输入！";
        return;
    }

    for (var i in valueArr) {
        var li = document.createElement("li");
        li.innerHTML = valueArr[i];
        $("result1").appendChild(li);
    }
}