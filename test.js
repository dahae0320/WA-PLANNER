//Add today date

const today = document.querySelector(".date");
var todate = document.createElement("p");
var todatetext = document.createTextNode("2021.6.26");
todate.className ="todatetext";
todate.appendChild(todatetext);
today.appendChild(todate);

//Add d-day or memo
const ddayS = document.querySelector(".dtdday");
var ddayP = document.createElement("p");
var ddayT = document.createTextNode("+여기에 디데이나 메모를 추가하세요");
ddayP.className = "dday-p";
ddayP.appendChild(ddayT);
ddayS.appendChild(ddayP)

//timer button
const timer = document.querySelector(".timer");
let mdState = 0; //0: start, 1: pause, 2:restart, 3:stop
const mdList = ["START", "PAUSE", "RESTART", "STOP"];
// var tmTextCon = document.createTextNode(mdList[0]);
// var tmP = document.createElement("p");
// tmP.className = "timer-p";
// tmP.appendChild(tmTextCon);
// timer.appendChild(tmP);

let flag = false;
timer.onclick = function changeMode(){
    if (mdState == 0){
        mdState = 1;
        var tmP = document.querySelector(".timer-p");
        tmP.innerText = mdList[1];
        timer.style.boxShadow = "8px 8px 3px 0px rgb(202, 202, 202) inset";
        flag = true;
        var interTimer = setInterval(runTimer, 1000);
    }
    else{
        clearInterval(interTimer);
        mdState = 0;
        var tmP = document.querySelector(".timer-p");
        tmP.innerText = mdList[0];
        flag = false
        timer.style.boxShadow = "-8px -8px 3px 0px rgb(202, 202, 202) inset";
        // console.log(tmP.innerText);
    }
    console.log(mdState);
}

//timer
const timerTime = document.querySelector(".timer-time-p");

let s = 0, m = 0, h = 0
function runTimer(){
    if(flag == true){
        s++;
        if(s>=60){
            s = 0;
        }
        timerTime.innerHTML = s; 
        //format("00:00:{}", s);
        console.log(s);
    }
}

//timetable



// const value = document.querySelector(".value")

// let testnum = 0
// function yes(){
//     testnum++;
//     value.innerHTML = testnum;
// }

// // setInterval(yes, 100);
