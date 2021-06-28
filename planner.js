//--------------------------------긁어온 포매팅 함수...(🚰·̫🚰)--------------------------------//
function format() { var args = Array.prototype.slice.call (arguments, 1); 
    return arguments[0].replace (/\{(\d+)\}/g, function (match, index) { return args[index]; }); }
    
//--------------------------------timetable matrix--------------------------------//
// 1. pm, am 표시도 있으면 좋겠다. => 완료
//--------------------------------------------------------------------------------//
const timetable = document.querySelector(".timetable-matrix");

for (let i = 0; i < 24; i++)
{
    //타임테이블 시간 5시부터 시작 0~12 단위로
    let numberT;
    if(i < 8)
        numberT = document.createTextNode(i+5);
    else if (i == 8)
        numberT = document.createTextNode(format("pm {0}", i-7));
    else if (i > 8 && i < 20)
        numberT = document.createTextNode(i-7);
    else if (i == 20)
    numberT = document.createTextNode(format("am {0}", i-19));
    else
        numberT = document.createTextNode(i-19);
    let number = document.createElement("p");
    number.appendChild(numberT);

    //ulDiv안에 시간 number와 ul이 들어감
    let ul = document.createElement("ul");
    let ulDiv = document.createElement("div");
    ulDiv.className = "ulDiv";
    ul.className = format("matrix-row-{0}", i+1);

    //border 겹치지 않게 따로 처리
    if(i == 0)
        ul.style.border = "1px solid rgb(187, 187, 187)";
    else
    {
        ul.style.borderBottom = "1px solid rgb(187, 187, 187)";
        ul.style.borderLeft = "1px solid rgb(187, 187, 187)";
        ul.style.borderRight = "1px solid rgb(187, 187, 187)";
    }

    //li 생성
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
    ulDiv.appendChild(number);
    ulDiv.appendChild(ul);
    timetable.appendChild(ulDiv);
}

//--------------------------------block drag--------------------------------//
// 1. 클릭한 줄에서 벗어나면 칠 안되게 => 완료(mousedown시 부모(ul)와 현재 부모가 같을때만 칠하도록 해서 해결). 
// 2. 만약 끝까지 칠했으면 다음 블럭까지 이어서 칠 가능하도록. 
// 3. 마우스 빠르게 움직이면 띄엄띄엄되는거 해결해야함. => 완료
// 4. 시간 숫자랑 격자 줄이랑 잘 안맞음. -> ul 앞에 숫자 추가하는 걸로 바꾸기? => 완료
// 5. 칠할 때 ul 위쪽 border가 먹힘.
// 6. 스크린 넓이 .. 가져와서 step 계산하기 or 이전 요소랑 비교해 같으면 추가 아니면 pass
// 7. 코드 함수화 해서 정리하기
//--------------------------------------------------------------------------------//

const blockColor = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];  // 나중에 사용자 지정 색 받아오기.

let mouseFlag = false
let mouseCnt = 0;
var mouseIsOverParentName = ""; //undefined 방지하기위해 자료형 정해줌.
var colorCnt = -1;
var mouseIsPass = new Array();
var mouseDownFirstX;

//마우스가 움직일 때마다 현재 마우스 좌표에 있는 element를 가져옴.
timetable.addEventListener("mousemove", function(event) {
    var x = event.clientX, y = event.clientY;               
    var mouseIsOverNow = document.elementFromPoint(x, y);
    var mouseIsOverNowName = mouseIsOverNow.parentNode.className;   //비교 위한 className 저장

    //클릭 시 == 드래그 시작 시
    window.onmousedown = function(){
        mouseFlag = true; 
        if(mouseCnt == 0){             
            mouseDownFirstX = x;
            mouseIsOverParentName = mouseIsOverNow.parentNode.className;
            // console.log(mouseIsOverParentName, mouseIsOverNow.parentNode.className);
            colorCnt++;
        }
        mouseCnt++; //ture false로 해도되긴함...
    }
    //클릭 끝 == 드래그 종료 시
    window.onmouseup = function(){mouseFlag = false; mouseCnt = 0; mouseIsPass = new Array();}

    console.log(mouseIsPass);
    //현재 객체가 li이고, mousedown상태이며, mousedown시 부모와 현재 부모가 같을 때만 색칠

    if(mouseIsOverNow.tagName == "LI" && mouseFlag == true && mouseIsOverNowName == mouseIsOverParentName){
        for(let i = mouseDownFirstX; i < x; i++){       //조정 필요
            var mouseIsOverNow = document.elementFromPoint(i, y);
            mouseIsPass.push(mouseIsOverNow);
        }
        for(let i = 0; i < mouseIsPass.length; i++){
            mouseIsPass[i].style.backgroundColor= blockColor[colorCnt % 6]; 
            // mouseIsOverNow.style.backgroundColor= blockColor[colorCnt % 6];   
        }
    }
});