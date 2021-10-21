const time = document.querySelector('.time');
const localeDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const body = document.querySelector('body');

const timeOfDay = [
  'night',
  'morning',
  'afternoon',
  'evening'
];

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  getTimeOfDay();
}
showTime();

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  localeDate.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  greeting.textContent = `Good ${timeOfDay[Math.floor(hours/6)]},`;
}

// Enter name part
function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
  console.log(name);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  const name = document.querySelector('.name');
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

// background
let randomNum = getRandomNum();

function getRandomNum() {
  let num = Math.floor(Math.random() * (20 - 1) + 1) ;
  return getImgNum(num);
}

function getImgNum(num) {
  let imgNum;
  if (num < 10) {
    imgNum = '0' + num;
  } else {
    imgNum = num;
  }
  return imgNum;
}

function setBg() {
  const date = new Date();
  const hours = date.getHours();
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay[Math.floor(hours/6)]}/${randomNum}.jpg')`;
}

setBg();

// Slide buttons
const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

function getSlideNext() {
  randomNum = (randomNum >= 20) ? randomNum = '01' : getImgNum(parseInt(randomNum) + 1);
  setBg();
}

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

function getSlidePrev() {
  randomNum = (randomNum <= 1) ? randomNum = '20' : getImgNum(parseInt(randomNum) - 1);
  setBg();
}
