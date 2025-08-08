const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "Piya O Re Piya (Jhankar)(MP3_160K).mp3",
    cover: "lukas-s-Iq5r7cM_Dmc-unsplash.jpg",
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "song2.mp3",
    cover: "cover2.jpg",
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "song3.mp3",
    cover: "cover3.jpg",
  },
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const progressLinear = document.getElementById("progress-linear");

const albumCover = document.querySelector(".album-cover");
const titleEl = document.querySelector(".title");
const artistEl = document.querySelector(".artist");

const progressCircle = document.querySelector(".progress-ring__circle");
const radius = progressCircle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;

progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
progressCircle.style.strokeDashoffset = circumference;

let currentSongIndex = 0;
let isPlaying = false;

function setSong(index) {
  const song = songs[index];
  audio.src = song.src;
  albumCover.src = song.cover;
  titleEl.textContent = song.title;
  artistEl.textContent = song.artist;

  // reset progress bar
  progressLinear.value = 0;
  progressCircle.style.strokeDashoffset = circumference;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.querySelector(".icon-play").style.display = "none";
  playBtn.querySelector(".icon-pause").style.display = "inline";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.querySelector(".icon-play").style.display = "inline";
  playBtn.querySelector(".icon-pause").style.display = "none";
}

playBtn.addEventListener("click", () => {
  if (isPlaying) pauseSong();
  else playSong();
});

prevBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  setSong(currentSongIndex);
  if (isPlaying) audio.play();
});

nextBtn.addEventListener("click", () => {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  setSong(currentSongIndex);
  if (isPlaying) audio.play();
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progressLinear.value = progressPercent;

  const offset = circumference - (progressPercent / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
});

progressLinear.addEventListener("input", (e) => {
  if (!audio.duration) return;
  const seekTime = (e.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;

  // Update circle progress immediately
  const offset = circumference - (e.target.value / 100) * circumference;
  progressCircle.style.strokeDashoffset = offset;
});

audio.addEventListener("ended", () => {
  nextBtn.click();
});

// Initialize first song
setSong(currentSongIndex);
