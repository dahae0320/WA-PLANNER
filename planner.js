////////////////////////////긁어온 포매팅 함수...(🚰·̫🚰)///////////////////////////////////
function format() { var args = Array.prototype.slice.call (arguments, 1); 
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index) { return args[index]; }); }
////////////////////////////timetable matrix///////////////////////////////////
const timetable = document.querySelector(".timetable-matrix");

for (let i = 0; i < 24; i++)
{
    // let number = document.createTextNode(i+6);
    let ul = document.createElement("ul");
    ul.className = format("matrix-row-{0}", i+1);
    if(i == 0)
        ul.style.border = "1px solid rgb(187, 187, 187)";
    else
    {
        ul.style.borderBottom = "1px solid rgb(187, 187, 187)";
        ul.style.borderLeft = "1px solid rgb(187, 187, 187)";
        ul.style.borderRight = "1px solid rgb(187, 187, 187)";
    }
    // let li = document.createElement("li");
    for(let j = 0; j < 60; j++)
    {
        let li = document.createElement("li");
        ul.appendChild(li);
        if((j+1) % 5 == 0)
        {
            if(j != 59)
            li.style.borderRight = "1px dotted rgb(187, 187, 187)";
        }
    }
    // timetable.appendChild(number);
    timetable.appendChild(ul);
}

////////////////////////////block drag///////////////////////////////////
// 1. 클릭한 줄에서 벗어나면 칠 안되게 => 완료. 
// 2. 만약 끝까지 칠했으면 다음 블럭까지 이어서 칠 가능하도록.
// 3. 마우스 빠르게 움직이면 띄엄띄엄되는거 해결해야함. -> 드래그 동안은 임의범위로 정하고 mouseup 했을 때 범위 내 블럭 색을 모두 바꾸면 가능
// 4. 시간 숫자랑 격자 줄이랑 잘 안맞음..ㅠ

const blockColor = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];

let mouseFlag = false
let mouseCnt = 0;
var mouseIsOverParentName = ""; //undefined 방지하기위해 자료형 정해줌.
var colorCnt = 0;
//마우스가 움직일 때마다 현재 마우스 좌표에 있는 element를 가져옴.
timetable.addEventListener("mousemove", function(event) {
    var x = event.clientX, y = event.clientY;               
    var mouseIsOverNow = document.elementFromPoint(x, y);
    var mouseIsOverNowName = mouseIsOverNow.parentNode.className;

    //클릭 시 == 드래그 시작 시
    window.onmousedown = function(){
        mouseFlag = true; 
        if(mouseCnt == 0){
            mouseIsOverParentName = mouseIsOverNow.parentNode.className;
            console.log(mouseIsOverParentName, mouseIsOverNow.parentNode.className);
            colorCnt++;
        }
        mouseCnt++;
    }
    //클릭 끝 == 드래그 종료 시
    window.onmouseup = function(){mouseFlag = false; mouseCnt = 0;}

    if(mouseIsOverNow.tagName == "LI" && mouseFlag == true && mouseIsOverNowName == mouseIsOverParentName){
        mouseIsOverNow.style.backgroundColor= blockColor[colorCnt % 7 - 1];
        
    }
    console.log(colorCnt);
});