/**
 * Created by wangtingdong on 16/3/24.
 */

var box=document.getElementById('box'),      //图表区
    ipt=document.getElementById('ipt'),      //输入框
    btn_box=document.getElementById('btn_box'),        //按钮容器，
    obj=box.children,       //插入的节点
    timer,
    moveNum=[0,0];

//绑定事件函数
function on(element,eventName,listener) {
    if(element.addEventListener) {
        element.addEventListener(eventName,listener,false);
    }
    else if(element.attachEvent) {
        element.attachEvent('on'+eventName,listener);
    }
    else {
        element['on'+eventName]=listener;
    }
}
//进入事件
function moveIn(name,num){
    var value = num==undefined ? ipt.value : num;    //如果num存在，则value＝num，否则值取输入框的值
    //判断输入的值是否符合要求
    if(!value || parseInt(value)>100 || parseInt(value)<10 || /[^0-9]/.test(value)) {
        alert('请输入10-100之间的数字');
    }
    else if(obj.length>60) {
        alert('数据已经超过60个，不能再增加了！！！');
    }
    else {
        var p=document.createElement('div');        //创建div节点
        p.style.height=value*5+'px';
        p.setAttribute('data-num',value);            //将输入的值存入data－num中
        if(name=='left_in') {
            p.setAttribute('class','moveInL');       //设置移入动画
            box.insertBefore(p,box.firstChild);      //在容器中插入节点
        }
        else if(name=='right_in') {
            p.setAttribute('class','moveInR');
            box.appendChild(p);                      //在结尾插入节点
        }
    }
}

//移出事件
function moveOut(name) {
    if(obj.length==0) {
        alert('数据为空，不能再移出');
        return 0;
    }
    /*
    * moveNum处理，当多次点击动画时，出现无法找到适当节点
    *
    * moveNum［0］＝ n 记录左侧有多少正在处于离开的节点，但是还没有被移除节点，下一次再点击动画时，处理的是子节点的第n个
    * */
    if(name=='left_out') {
        obj[moveNum[0]].className='moveOutL';          //设置移出的动画
        setTimeout(function(){
            box.removeChild(box.firstElementChild);
            moveNum[0]--;
        },1000);     //动画完成之后将节点删除
        moveNum[0]++;
    }
    else if(name=='right_out') {
        obj[obj.length-1-moveNum[1]].setAttribute('class','moveOutR');
        setTimeout(function(){
            box.removeChild(box.lastElementChild);
            moveNum[1]--;
        },1000);
        moveNum[1]++;
    }
}

//事件代理，为四个按钮绑定事件.
on(btn_box,'click',function(e){
    var event= e.target ? e.target.id : e.srcElement.id;    //点击的按钮的id值，便于获取点击按钮名称
    if(timer) {        //如果已经存在计时，则退出
        alert('正在排序');
        return 0;
    }
    switch(event) {
        case 'left_in':
        case 'right_in':
            moveIn(event);      //移入事件
            break;
        case 'left_out':
        case 'right_out':
            moveOut(event);     //移出事件
            break;
        case 'sort':
            sort();             //排序事件
            break;
        case 'random':
            random();
            break;
    }

});

//随机产生三十个数据，用于展示冒泡排序
function random(){
    box.innerHTML='';     //清空数据
    for(var i=0;i<30;i++) {
        if(i%2==0) {
            moveIn('left_in',parseInt(Math.random()*90+10));
        }
        else {
            moveIn('right_in',parseInt(Math.random()*90+10));
        }
    }
}

//改变两个节点位置
function change(num1,num2){
    obj[num1].className='RightMove';            //设置移动的动画
    obj[num2].className='LeftMove';
    setTimeout(function(){                      //在动画完成的瞬间将两个节点位置交换
        obj[num1].className='';                 //清空动画
        obj[num2].className='';
        box.insertBefore(obj[num2],obj[num1]);   //把小的（obj[num2]）移到大的前面(往左移)；
    },390);
}

//冒泡排序
function sort(){
    var i=obj.length,      //记录每次最后一组数据，即下次循环结束点
        j= 0,
        changeNum=0;   //记录每次交换时候的位置

    if(i==0) {
        alert('没有数据排序');
        return;
    }
    else if(i==1) {
        alert('只有一组数据，不需要排序');
        return;
    }
    timer=setInterval(function() {         //每隔500秒对比一组相邻数据
        if(j>=i-1) {
            j=0;
            if(!changeNum) {           //为0说明循环一次没有需要交换的，全部都满足了条件，故退出循环
                clearInterval(timer);
                timer=null;        //可以重新开始排序
                return 0;
            }
            i=changeNum;         //将这组最后一次交换的数据给i
            changeNum=0;                    //重新从第一个交换
        }
        setColor(j);      //设置颜色改变，便于观察
        //对比前后相邻的两组数据，如果前者比后者大就交换两个节点位置。
        if(obj[j].getAttribute('data-num') > obj[j+1].getAttribute('data-num')) {
            change(j,j+1);
            changeNum=j+1;      //重置交换的位置
        }
        j++;
    },500);
}
// 事件代理，点击元素时，该元素从队列中删除
on(box,'click',function(e){
    var target = e.target ? e.target : e.srcElement;
    if(timer) {        //如果正在排序，则退出
        alert('正在排序');
        return 0;
    }
    if(target.tagName) {
        target.className='moveOutR';
        setTimeout(function(){
            box.removeChild(target);
        },1000);
    }
});

//设置颜色改变，便于观察
function setColor(j){
    obj[j].style.backgroundColor='blue';     //设置正在比较大小的节点颜色为blue
    obj[j+1].style.backgroundColor='blue';
    setTimeout(function(){
        obj[j].style.backgroundColor='red';      //清空之前设置的颜色
        obj[j+1].style.backgroundColor='red';
    },390);
}

