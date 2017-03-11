function $(id) {
	return document.getElementById(id);
};

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener, false); //DOM2.0
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, listener); //IE5+
	} else {
		element['on' + event] = listener; //DOM 0
	}
};
var t = countTime;
addEvent($("countTime"), 'click', function() {
	$("timeChange").innerHTML = "";
	clearInterval(t);
	t = countTime();
});

addEvent($("time"), 'keyup', function(event) {
	if (event.keyCode == "13") {
		$("timeChange").innerHTML = "";
		clearInterval(t);
		t = countTime();
	}
});

function countTime() {
	var inputTime = new Date($('time').value.split('-').join('/'));
	setInterval(function() {
		if (/^\d{4}-\d+-\d+$/.test($('time').value)) {
			var nowTime = new Date();
			if (inputTime >= nowTime) {
				var differTime = inputTime - nowTime;
				var difDay = Math.floor(differTime / (24 * 60 * 60 * 1000));
				var difHour = Math.floor((differTime - difDay * (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
				var difMin = Math.floor((differTime / (60 * 60 * 1000) - Math.floor(differTime / (60 * 60 * 1000))) * 60);
				var difSec = Math.floor((differTime / (60 * 1000) - Math.floor(differTime / (60 * 1000))) * 60);
				$("timeChange").innerHTML = "距离" + nowTime.getFullYear() + "年" +
					(nowTime.getMonth() + 1) + "月" + nowTime.getDate() + "日还有" + difDay + "天" +
					difHour + "小时" + difMin + "分" + difSec + "秒";
			} else {
				$("timeChange").innerHTML = "输入时间小于当前时间，请重新输入！";
			}
		} else {
			$("timeChange").innerHTML = "输入时间格式错误，请重新输入！";
		}
	}, 1000);
};