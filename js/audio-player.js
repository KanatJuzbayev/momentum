const audio = new Audio();
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const playListContainer = document.querySelector('.play-list');

import playList from './playList.js';

let isPlay = false;
let soundNum = 0;

function playPauseAudio() {
  if (!isPlay) {
    audio.src = playList[soundNum].src;
    audio.currentTime = 0;
    audio.play();
    getActveSoundTitle();
    console.log('playing');
    isPlay = true;
    play.classList.add('pause');
  } else {
    audio.pause();
    console.log('pause');
    getActveSoundTitle();
    isPlay = false;
    play.classList.toggle('pause');
  }
}

function playPrevSound() {
  if (isPlay) {
    isPlay = false;
    soundNum = (soundNum > 0) ? soundNum - 1 : 3;
    playPauseAudio();
    getActveSoundTitle();
    console.log(soundNum);
  }
}

function playNextSound() {
  if (isPlay) {
    isPlay = false;
    soundNum = (soundNum < 3) ? soundNum + 1 : 0;
    playPauseAudio();
    getActveSoundTitle();
    console.log(soundNum);
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
  // const prevActiveSound = document.querySelector('.item-active');
  // prevActiveSound.classList.toggle('item-active');
  const activeSound = document.querySelector(`li[data-sound="${soundNum}"]`);
  activeSound.classList.add('item-active');
}


console.log(soundNum);
