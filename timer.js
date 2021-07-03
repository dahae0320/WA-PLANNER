// import isSwitchOn from './planner.js'

//============================ToDo============================
// 1. 시작,일시정지,종료,초기화 구현 = 완료
// 2. 시작버튼 눌렀을때 시작버튼 사라지고 일시정지버튼 남음 = 완료
// 3. 일시정지버튼 눌렀을때 일시정지 버튼 사라지고 시작버튼 남음 = 완료
// 4. 일시정지 눌렀을때 왼쪽반원 시작, 오른쪽반원 종료 버튼 구현 = 완료
// 5. 일시정지 시간 기록, 타임테이블에 넘겨줄 데이터 +함수 구현 
// 6. 피그마처럼 꾸미기(위치 색깔, 그림자) = 완료

// START 후 초단위의 시간을 시간:분:초 형태의 텍스트로 형변환 하는 함수
function timeToString(time) {
  let diffInHrs = time / 3600000;  //시간
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60; //분
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60; //초
  let ss = Math.floor(diffInSec);

  // ms단위를 구현하려면 아래 두줄 주석 해제후 start 함수의 setinterval의 마지막 파라미터를 10으로 바꿈
  // let diffInMs = (diffInSec - ss) * 100; 
  // let ms = Math.floor(diffInMs);

  
  let formattedHH = hh.toString().padStart(2, "0"); 
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  // let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}:${formattedMM}:${formattedSS}`;

}
function timeToStringReal(time) {
  let diffInHrs = time / 3600000;  //시간
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60; //분
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60; //초
  let ss = Math.floor(diffInSec);

  // ms단위를 구현하려면 Line 13,14,20 주석 해제후 start 함수의 setinterval의 마지막 파라미터를 10으로 바꿈
  // let diffInMs = (diffInSec - ss) * 100; 
  // let ms = Math.floor(diffInMs);

  
  let formattedHH = hh.toString().padStart(2, "0"); 
  let formattedMM = mm.toString().padStart(2, "0");
  let formattedSS = ss.toString().padStart(2, "0");
  // let formattedMS = ms.toString().padStart(2, "0");

  return `${formattedHH}H ${formattedMM}M ${formattedSS}S`;
}



let startTime;
let elapsedTime = 0;

let timerInterval;
let timerIntervalReal; //타임테이블 위의 누적시간

// 리셋 & 종료후 버튼을 초기상태로 돌려놓는 함수입니다.
function init(){
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  stopButton.style.display="none";
  pauseButton.style.display="none";
  startButton.style.display = "block";
  startButton.style.width = "20vw"
  startButton.style.borderRadius = "50%"
}
function getLiId(){
  let today = new Date();
  let hrs = today.getHours()-5;
  let min = today.getMinutes();
  let txt = 'h'+hrs.toString()+'m'+min.toString();
  return txt
}
// 버튼아래있는 display 출력 함수
function print(txt) {
  document.getElementById("display").innerHTML = txt;
  
}
// 오른쪽 타임테이블 위 누적 학습시간 출력 함수
function printreal(txt){
  document.getElementById("time-real").innerHTML = txt;
}



//시작버튼 클릭시 이벤트함수
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
    isSwitchOn ? document.getElementById(getLiId()).style.backgroundColor="blue" : null;
  }, 10);
  stopButton.style.boxShadow="0px 10px 3px rgba(0, 0, 0, 0.07) inset";
  stopButton.style.display="block";
  pauseButton.style.display="block";
  startButton.style.display = "none";
}


  

  // else{
    // startTime = Date.now() - elapsedTime;
    // timerInterval = setInterval(function printTime() {
    //   elapsedTime = Date.now() - startTime; realTime = elapsedTime;
    //   print(timeToString(elapsedTime));},10); }
    // }
    
  
  
  
  
  


// 일시정지버튼 클릭시 이벤트함수
function pause() {
  clearInterval(timerInterval);
  // clearInterval(timerIntervalReal);
  // pauseTime.push(timeToString(Date.now()))
  startButton.style.width = "10vw";
  startButton.style.borderRadius="10vw 0px 0px 10vw"
  stopButton.style.boxShadow="10px 10px 3px rgba(0, 0, 0, 0.07) inset";
  pauseButton.style.display="none";
  startButton.style.display = "block";
  
}

// 종료버튼 클릭시 이벤트함수
function stop(){
  totalTime.push(elapsedTime);
  let realTime = 0;
  for (index = 0; index < totalTime.length; index++){
    realTime += totalTime[index];
  }
  printreal(timeToStringReal(realTime));

  init();
  
  //공부 시간 타임테이블로 전달
}

// 리셋버튼 클릭시 이벤트함수
function reset() {

  init(); 
}
// 버튼 클릭시 그림자 변경

let pauseTime = [];
let totalTime = [];
let index = 0;
let startButton = document.getElementById("btn-start");
let pauseButton = document.getElementById("btn-pause");
let stopButton = document.getElementById("btn-stop");
let resetButton = document.getElementById("btn-reset");

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);


