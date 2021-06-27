const timetable = document.querySelector(".timetable-matrix");

for (let i = 0; i < 24; i++)
{
    let ul = document.createElement("ul");
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
    timetable.appendChild(ul);
}

//block drag
// 1. 클릭한 ul에서 벗어나면 칠 안되게. 만약 끝까지 칠했으면 다음 블럭까지 이어서 칠 가능하도록.
// 2. 마우스 빠르게 움직이면 띄엄띄엄됨.

let mouseFlag = false
timetable.addEventListener("mousemove", function(event) {
    var x = event.clientX, y = event.clientY;
    var elementMouseIsOver = document.elementFromPoint(x, y);
    var parentOver;
    // console.log(elementMouseIsOver.tagName);
    window.onmousedown = function(){mouseFlag = true; parentOver = elementMouseIsOver.parentNode;}
    window.onmouseup = function(){mouseFlag = false;}

    if(elementMouseIsOver.tagName == "LI" && mouseFlag == true){
        elementMouseIsOver.style.backgroundColor="orange";
    }

});
