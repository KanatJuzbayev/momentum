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
  const city = document.querySelector('.city');
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  const name = document.querySelector('.name');
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  const city = document.querySelector('.city');
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
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
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/KanatJuzbayev/stage1-tasks/assets/images/${timeOfDay[Math.floor(hours/6)]}/${randomNum}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/KanatJuzbayev/stage1-tasks/assets/images/${timeOfDay[Math.floor(hours/6)]}/${randomNum}.jpg')`;
  };
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

//weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=bf51541e93ccab030e77180d669b93b1&units=metric`;
  // const res = await fetch(url);
  // const data = await res.json();

  fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
    weatherError.textContent = ``;

    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.floor(data.wind.speed)} m/c`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
  })
  .catch(function(error) {
    weatherError.textContent = error.message;
    console.log(error);
  });

}
getWeather();

city.addEventListener('change', getWeather);
