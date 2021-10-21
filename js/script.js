const time = document.querySelector('.time');
const localeDate = document.querySelector('.date');
const greeting = document.querySelector('.greeting');

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
  const timeOfDay = [
    'night',
    'morning',
    'day',
    'evening'
  ];
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
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

// background
const body = document.querySelector(body);
console.log(body);
