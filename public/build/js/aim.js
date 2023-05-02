const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const gameBoard=document.querySelector('.game-board')
const colors = ['#00FFFF', '#7B68EE', '#0000FF', '#ADFF2F', '#2E8B57', '#006400', '#FFC0CB', '#FF1493', '#C71585', '#FFFF00', '#F0E68C', '#FF4500', '#EE82EE', '#8B008B', '#4B0082', '#2F4F4F', '#696969', '#DCDCDC']
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event)=>{
  event.preventDefault();
    time = parseInt(event.target.getAttribute('data-time'));
    gameBoard.style.display='flex'
    startGame();
});

// timeList.addEventListener('click', (event)=>{
//   if(event.target.classList.contains('time-btn')){
//     time = parseInt(event.target.getAttribute('data-time'));
//     screens[1].classList.add('up');
//     startGame();
//   }
// });

board.addEventListener('click', (event)=>{
  if(event.target.classList.contains('circle')){
  score++;
  event.target.remove();
  createRandomCircle();
  }
});

function startGame(){
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
};

function decreaseTime(){
  if(time == 0){
    finishGame();
  }else{
    let current = --time;
    if(current<10){
      current = `0${current}`
    };
    setTime(current);
  };
};

function setTime(value){
  timeEl.innerHTML = `00:${value}`;
};

function finishGame(){
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify({
      "time": score,
      "email": window.localStorage.getItem('email'),
      "level" : 5,
      "attempt" : 1
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://localhost:3000/games/scores", requestOptions)
      .then(response => response.json())
      .then(result => {
      })
      .catch(error => console.log('error', error));
  board.innerHTML = `<h1>RESULT: <span class="primary">${score}</span></h1>`;
  board.innerHTML = `<a class="button-30" style="background-color:#F2DEBA; color:black;" href="../pages/profile.html">Done</a>`;
  timeEl.parentNode.classList.add('hide');
  window.localStorage.removeItem('attempt1')
  window.localStorage.removeItem('attempt2')
  window.localStorage.removeItem('attempt3')
  window.localStorage.removeItem('attempt4')
};

function createRandomCircle(){
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  const {width, height} = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const color = getRandomColor();

  circle.classList.add('circle');
  circle.style.backgroundColor = color;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
};

function getRandomNumber(min, max){
  return Math.round(Math.random() * (max - min) + min);
};

function getRandomColor(){
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};