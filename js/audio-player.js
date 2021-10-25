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
  if (!isPlay) {
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
    soundNum = (soundNum > 0) ? soundNum - 1 : 3;
    playPauseAudio();
    getActveSoundTitle();
  }
}

function playNextSound() {
  if (isPlay) {
    isPlay = false;
    removeItemActive();
    soundNum = (soundNum < 3) ? soundNum + 1 : 0;
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
}

function removeItemActive() {
  const prevActiveSound = document.querySelector(`li[data-sound="${soundNum}"]`);
  prevActiveSound.classList.remove('item-active');
}
