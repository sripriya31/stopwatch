const timeDisplay = document.querySelector('.time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

let startTime;
let interval;

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
lapButton.addEventListener('click', addLap);

function startTimer() {
  startTime = Date.now() - (startTime ? startTime : 0);
  interval = setInterval(updateTime, 10);
  startButton.disabled = true;
  pauseButton.disabled = false;
}

function pauseTimer() {
  clearInterval(interval);
  startButton.disabled = false;
  pauseButton.disabled = true;
}

function updateTime() {
  const currentTime = Date.now() - startTime;
  const formattedTime = formatTime(currentTime);
  timeDisplay.textContent = formattedTime;
}

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  const seconds = date.getUTCSeconds().toString().padStart(2, '0');
  const milliseconds = (date.getUTCMilliseconds() / 10).toFixed(0).toString().padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function resetTimer() {
  clearInterval(interval);
  timeDisplay.textContent = '00:00:00';
  startButton.disabled = false;
  pauseButton.disabled = true;
  lapList.innerHTML = '';
}

function addLap() {
  const lapTime = timeDisplay.textContent;
  const lapItem = document.createElement('li');
  lapItem.textContent = lapTime;
  lapList.appendChild(lapItem);
}
