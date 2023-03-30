// Hent HTML-elementer
const playPauseButton = document.getElementById("play-pause");
const skipForwardButton = document.getElementById("skip-forward");
const skipBackwardButton = document.getElementById("skip-backward");
const songInfo = document.getElementById("song-info");
const albumArt = document.getElementById("album-art");
const audioPlayer = document.getElementById("audio-player");
const songList = document.querySelectorAll(".song");
const autoplayCheckbox = document.getElementById("autoplay");
const shuffleCheckbox = document.getElementById("shuffle");
const currentTime = document.getElementById("current-time");
const duration = document.getElementById("duration");

// Lag en array med sanger og bildeurl-er
const playlist = [
  {
    title: "Lose Yourself",
    artist: "Eminem",
    file: "eminemthe.mp3",
    image: "eminem.jpg"
  },
  {
    title: "Billie Jean",
    artist: "Michael Jackson",
    file: "michael.mp3",
    image: "michael2.jpg"
  },
  {
    title: "Bohemian Rhapsody",
    artist: "Queen",
    file: "bohemian.mp3",
    image: "bohemian2.jpg"
  },
  {
    title: "Dancing Queen",
    artist: "Abba",
    file: "abba.mp3",
    image: "Abba.jpg"
  },
  {
    title: "Shape of You",
    artist: "Ed Sheeran",
    file: "EdSheeran.mp3",
    image: "EDjpg.jpg"
  },
  {
    title: "Sweet Child O' Mine",
    artist: "Guns N' Roses",
    file: "GunsN' Roses.mp3",
    image: "logojpg.jpg"
  },
  {
    title: "Don't Stop Believin'",
    artist: "Journey",
    file: "journey.mp3",
    image: "journey_band.jpg"
  },
  {
    title: "Like a Rolling Stone",
    artist: "Bob Dylan",
    file: "Likerunning.mp3",
    image: "dylan.jpg"
  },
  {
    title: "Cold",
    artist: "Maroon 5",
    file: "Maroon5.mp3",
    image: "Maroon5.jpg"
  },
  {
    title: "Stayin' Alive",
    artist: "ROSE BEAT",
    file: "rosebeat.mp3",
    image: "roses4.jpg"
  }
];


let currentSongIndex = 0;

// Oppdater tidsstempelvisning
audioPlayer.addEventListener("timeupdate", updateTime);

function updateTime() {
  var timeDisplay = document.getElementById("time-display");
  var currentTime = Math.floor(audioPlayer.currentTime);
  var minutes = Math.floor(currentTime / 60);
  var seconds = currentTime - minutes * 60;
  var duration = Math.floor(audioPlayer.duration);
  var durationMinutes = Math.floor(duration / 60);
  var durationSeconds = duration - durationMinutes * 60;

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  if (durationSeconds < 10) {
    durationSeconds = "0" + durationSeconds;
  }

  timeDisplay.innerHTML = minutes + ":" + seconds + " / " + durationMinutes + ":" + durationSeconds;

  console.log('currentTime:', audioPlayer.currentTime);
  console.log('duration:', audioPlayer.duration);
}


// Funksjon for å spille av sang
function playSong(index) {
  const song = playlist[index];
  songInfo.querySelector("h2").textContent = song.title;
  songInfo.querySelector("h3").textContent = song.artist;
  albumArt.src = song.image;
  audioPlayer.src = song.file;
  audioPlayer.play();
  updateTime();
}

// Funksjon for å bytte til neste sang
function nextSong() {
  if (shuffleCheckbox.checked) {
    currentSongIndex = Math.floor(Math.random() * playlist.length);
  } else {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
  }
  playSong(currentSongIndex);
}

// Lytt til klikk på Spill/Pause-knapp
playPauseButton.addEventListener("click", () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.textContent = "Pause";
  } else {
    audioPlayer.pause();
    playPauseButton.textContent = "Spill";
  }
});

// Lytt til klikk på Neste-knapp
skipForwardButton.addEventListener("click", nextSong);

// Lytt til klikk på Forrige-knapp
skipBackwardButton.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
  playSong(currentSongIndex);
});

// Oppdater tidsstempelvisning
audioPlayer.addEventListener("timeupdate", updateTime);

// Start første
