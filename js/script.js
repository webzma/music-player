const previousButton = document.querySelector('.previous')
const nextButton = document.querySelector('.next')
const pauseButton = document.querySelector('.pause')
const audioPlayer = document.querySelector("#audio-player")
const minutesStart = document.querySelector('#minutes-start')
const totalMinutes = document.querySelector('#total-minutes')
const line = document.querySelector('#seek-bar')
let pausedTime = 0

let songIndex = 0

const songs = [
  {
    img: './assets/cover-1.png',
    url: './js/lost-in-city-lights-145038.mp3',
    author: 'Cosmo Sheldrake',
    title: 'Lost in the City Lights'
  },
  {
    img: './assets/cover-2.png',
    url: './js/forest-lullaby-110624.mp3',
    author: 'Lesfm',
    title: 'Forest L  ullaby'
  },
]

function previousSong() {
  if (songIndex == 1) {
    songIndex = 0
    playSong()
  }
  else {
    songIndex = 1
    playSong()
  }
}

function nextSong() {
  if (songIndex == 1) {
    songIndex = 0
    playSong()
  }
  else {
    songIndex = 1
    playSong()
  }
}

function playSong() {
  const currentSong = songs[songIndex]
  audioPlayer.setAttribute('src', currentSong.url)
  document.querySelector('.title-song').textContent = currentSong.title
  document.querySelector('.author-song').textContent = currentSong.author
  document.querySelector('.song-img').src = currentSong.img

  if (pausedTime) {
    audioPlayer.currentTime = pausedTime
    pausedTime = 0
  }

  audioPlayer.play()
}

function toggleSong() {
  if (audioPlayer.paused || audioPlayer.ended) {
    playSong()
  } else {
    pauseSong()
  }
}

function pauseSong() {
  pausedTime = audioPlayer.currentTime
  audioPlayer.pause()
}

// Event listener
previousButton.addEventListener('click', previousSong)
pauseButton.addEventListener('click', toggleSong)
nextButton.addEventListener('click', nextSong)

audioPlayer.addEventListener('timeupdate', () => {
  const songMinutes = Math.floor(audioPlayer.duration / 60)
  const songSeconds = Math.floor(audioPlayer.duration - songMinutes * 60)
  const progressPercent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
  const currentMinutes = Math.floor(audioPlayer.currentTime / 60)
  const currentSeconds = Math.floor(audioPlayer.currentTime - currentMinutes * 60);

  line.style.background = `linear-gradient(to right, #c93b76 0%, #c93b76 ${progressPercent}%, #ffffff ${progressPercent}%, #ffffff 100%)`;


  if (songMinutes && songSeconds) {
    totalMinutes.textContent = songMinutes < 10 ? `0${songMinutes}:${songSeconds}` : `${songMinutes}:${songSeconds}`

    minutesStart.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
  }

  line.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
})

line.addEventListener('change', () => {
  audioPlayer.currentTime = (line.value * audioPlayer.duration) / 100
})