//============================ToDo============================
// 1. 시작,일시정지,종료,초기화 구현 = 완료
// 2. 시작버튼 눌렀을때 시작버튼 사라지고 일시정지버튼 남음 = 완료
// 3. 일시정지버튼 눌렀을때 일시정지 버튼 사라지고 시작버튼 남음 = 완료
// 4. 일시정지 눌렀을때 왼쪽반원 시작, 오른쪽반원 종료 버튼 구현

// START 후 초단위의 시간을 시간:분:초 형태의 텍스트로 형변환 하는 함수
function timeToString(time) {
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

  return `${formattedHH}:${formattedMM}:${formattedSS}`;
}



let startTime;
let elapsedTime = 0;
let timerInterval;


// 버튼아래있는 누적시간 출력 함수
function print(txt) {
  document.getElementById("display").innerHTML = txt;
}

//시작버튼 클릭시 이벤트함수
function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(function printTime() {
    elapsedTime = Date.now() - startTime;
    print(timeToString(elapsedTime));
  }, 1000);
  showButton("PAUSE");
  // showButton("END");
}

// 일시정지버튼 클릭시 이벤트함수
function pause() {
  clearInterval(timerInterval);
  showButton("PLAY");
}

// 종료버튼 클릭시 이벤트함수
function stop(){
  clearInterval(timerInterval);
  // 타임테이블의  db에 elapsedtime을 전달하는 식
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}

// 리셋버튼 클릭시 이벤트함수
function reset() {
  clearInterval(timerInterval);
  print("00:00:00");
  elapsedTime = 0;
  showButton("PLAY");
}


function showButton(buttonKey) {
  const buttonToShow = buttonKey === "PLAY" ? startButton : pauseButton;
  const buttonToHide = buttonKey === "PLAY" ? pauseButton : startButton;
  buttonToShow.style.display = "block";
  buttonToHide.style.display = "none";
}

let startButton = document.getElementById("btn-start");
let pauseButton = document.getElementById("btn-pause");
let stopButton = document.getElementById("btn-stop");
let resetButton = document.getElementById("btn-reset");

startButton.addEventListener("click", start);
pauseButton.addEventListener("click", pause);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);


