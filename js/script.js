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
  const options = { weekday: 'long', month: 'long', day: 'numeric' };
  const currentDate = date.toLocaleDateString('en-US', options);
  localeDate.textContent = currentDate;
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();

  greeting.textContent = `Good ${timeOfDay[Math.floor(hours / 6)]},`;
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
let randomImg = getRandomNum();

function getRandomNum() {
  let num = Math.floor(Math.random() * (20 - 1) + 1);
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
  img.src = `https://raw.githubusercontent.com/KanatJuzbayev/stage1-tasks/assets/images/${timeOfDay[Math.floor(hours / 6)]}/${randomImg}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/KanatJuzbayev/stage1-tasks/assets/images/${timeOfDay[Math.floor(hours / 6)]}/${randomImg}.jpg')`;
  };
}
setBg();

// Slide buttons
const slideNext = document.querySelector('.slide-next');
slideNext.addEventListener('click', getSlideNext);

function getSlideNext() {
  randomImg = (randomImg >= 20) ? randomImg = '01' : getImgNum(parseInt(randomImg) + 1);
  setBg();
}

const slidePrev = document.querySelector('.slide-prev');
slidePrev.addEventListener('click', getSlidePrev);

function getSlidePrev() {
  randomImg = (randomImg <= 1) ? randomImg = '20' : getImgNum(parseInt(randomImg) - 1);
  setBg();
}

weather
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');

async function getWeather() {
const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=bf51541e93ccab030e77180d669b93b1&units=metric`;

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
    });

}
getWeather();

city.addEventListener('change', getWeather);

// Quotes
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

function getQuotes() {
  const quotes = 'js/myData.json';
  fetch(quotes)
    .then(res => res.json())
    .then(myData => {
      const quoteNum = getRandomQuoteNum();
      quote.textContent = `"${myData[quoteNum].text}"`;
      author.textContent = myData[quoteNum].author;
    });
}

function getRandomQuoteNum() {
  let num = Math.floor(Math.random() * 193);
  return num;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);
