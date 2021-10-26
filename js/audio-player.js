const audio = new Audio();
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

import playList from './playList.js';

let isPlay = false;
let soundNum = 0;

audio.addEventListener("ended", playNextSound);

function playPauseAudio() {
  if (isPlay == false) {
    audio.src = playList[soundNum].src;
    audio.currentTime = 0;
    audio.play();

    getActveSoundTitle();
    isPlay = true;
    play.classList.add('pause');
  } else {
    audio.pause();
    removeItemActive();
    isPlay = false;
    play.classList.toggle('pause');
  }
}

function playPrevSound() {
  if (isPlay) {
    isPlay = false;
    removeItemActive();
    soundNum = (soundNum > 0) ? soundNum - 1 : 4;
    playPauseAudio();
    getActveSoundTitle();
  }
}

function playNextSound() {
  if (isPlay) {
    isPlay = false;
    removeItemActive();
    soundNum = (soundNum < 4) ? soundNum + 1 : 0;
    playPauseAudio();
    getActveSoundTitle();
  }
}

play.addEventListener('click', playPauseAudio);
playPrev.addEventListener('click', playPrevSound);
playNext.addEventListener('click', playNextSound);

playList.forEach(el => {
  let sound = playList.indexOf(el);
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.dataset.sound = sound;
  li.textContent = el.title;
  playListContainer.append(li);
});

function getActveSoundTitle() {
  const activeSound = document.querySelector(`li[data-sound="${soundNum}"]`);
  activeSound.classList.add('item-active');
  const soundName = document.querySelector('.sound-name');
  soundName.textContent = playList[soundNum].title;
}

function removeItemActive() {
  const prevActiveSound = document.querySelector(`li[data-sound="${soundNum}"]`);
  prevActiveSound.classList.remove('item-active');
}

//Play by Click on sound title
const playItems = document.querySelectorAll('.play-item');
playItems.forEach(item => item.addEventListener('click', playSoundTitle));

function playSoundTitle() {
  // if (soundNum == this.dataset.sound && isPlay == true) {
  //   removeItemActive();
  //   isPlay = true;
  //   playPauseAudio();
  //   console.log(isPlay);
  // }
  isPlay = false;
  removeItemActive();
  soundNum = this.dataset.sound;
  playPauseAudio();
  getActveSoundTitle();
}




// Player envolved

// Possible improvements:
// - Change timeline and volume slider into input sliders, reskinned
// - Change into Vue or React component
// - Be able to grab a custom title instead of "Music Song"
// - Hover over sliders to see preview of timestamp/volume change

const audioPlayer = document.querySelector(".audio-player");


console.dir(audio);

audio.addEventListener(
  "loadeddata",
  () => {
    audioPlayer.querySelector(".audio-time .length").textContent = getTimeCodeFromNum(
      audio.duration
    );
    audio.volume = 0.75;
  },
  false
);

//click on timeline to skip around

const timeline = audioPlayer.querySelector(".timeline");
timeline.addEventListener(
  "click",
  (e) => {
    const timelineWidth = window.getComputedStyle(timeline).width;
    const timeToSeek = (e.offsetX / parseInt(timelineWidth)) * audio.duration;
    audio.currentTime = timeToSeek;
  },
  false
);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener(
  "click",
  (e) => {
    const sliderWidth = window.getComputedStyle(volumeSlider).width;
    const newVolume = e.offsetX / parseInt(sliderWidth);
    audio.volume = newVolume;
    audioPlayer.querySelector(".controls .volume-percentage").style.width =
      newVolume * 100 + "%";
  },
  false
);

//check audio percentage and update time accordingly
setInterval(() => {
  const progressBar = audioPlayer.querySelector(".progress");
  progressBar.style.width = (audio.currentTime / audio.duration) * 100 + "%";
  audioPlayer.querySelector(".audio-time .current").textContent = getTimeCodeFromNum(
    audio.currentTime
  );
}, 500);

//toggle between playing and pausing on button click
// const playBtn = audioPlayer.querySelector(".controls .toggle-play");
// playBtn.addEventListener(
//   "click",
//   () => {
//     if (audio.paused) {
//       playBtn.classList.remove("play");
//       playBtn.classList.add("pause");
//       audio.play();
//     } else {
//       playBtn.classList.remove("pause");
//       playBtn.classList.add("play");
//       audio.pause();
//     }
//   },
//   false
// );

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
  const volumeEl = audioPlayer.querySelector(".volume-container .volume");
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeEl.classList.remove("icono-volumeMedium");
    volumeEl.classList.add("icono-volumeMute");
  } else {
    volumeEl.classList.add("icono-volumeMedium");
    volumeEl.classList.remove("icono-volumeMute");
  }
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${minutes}:${String(
    seconds % 60
  ).padStart(2, 0)}`;
}

console.log('Добрый день. Если есть возможность можешь проверить в четверг во второй половине или потянуть с проверкой на сколько возможно, пока доделываю. Спасибо!');
