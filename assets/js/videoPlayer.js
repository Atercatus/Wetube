// let videoPlayer;
// videoPlayer = videoContainer.querySelector("video");
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");
const volumeRange = document.getElementById("jsVolume");

window.addEventListener("keydown", function(e) {
  if (
    (e.key === " " || e.key === "ArrowUp" || e.key === "ArrowDown") &&
    (e.target == document.body ||
      e.target == document.getElementById("jsVideoPlayer"))
  ) {
    e.preventDefault();
  }
});

function setFullscreenBtn() {
  fullScreenBtn.classList.remove("fa-compress");
  fullScreenBtn.classList.add("fa-expand");

  fullScreenBtn.addEventListener("click", goFullscreen);
  fullScreenBtn.removeEventListener("click", exitFullscreen);
}

function exitFullscreen() {
  //   setExitFullScreenBtn();

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function setExitFullscreenBtn() {
  fullScreenBtn.classList.remove("fa-expand");
  fullScreenBtn.classList.add("fa-compress");

  fullScreenBtn.removeEventListener("click", goFullscreen);
  fullScreenBtn.addEventListener("click", exitFullscreen);
}

function goFullscreen() {
  //   setFullscreenBtn();

  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.mozRequestFullscreen) {
    videoContainer.MozRequestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    videoContainer.msRequestFullscreen();
  }
}

const formatDate = secs => {
  const secondsNumber = parseInt(secs, 10); // 10진법
  let hours = Math.floor(secondsNumber / 3600);
  let minutes = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds = Math.floor(secondsNumber - hours * 3600 - minutes * 60);

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (totalSeconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

function handlePlay() {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.classList.remove("fa-play");
    playBtn.classList.add("fa-pause");
  } else {
    videoPlayer.pause();
    playBtn.classList.remove("fa-pause");
    playBtn.classList.add("fa-play");
  }
}

function setVolumeIcon() {
  volumeBtn.classList.remove("fa-volume-up");
  volumeBtn.classList.remove("fa-volume-down");
  volumeBtn.classList.remove("fa-volume-mute");
  volumeBtn.classList.remove("fa-volume-off");

  if (volumeRange.value >= 70) {
    volumeBtn.classList.add("fa-volume-up");
  } else if (volumeRange.value >= 20) {
    volumeBtn.classList.add("fa-volume-down");
  } else if (volumeRange.value == 0) {
    volumeBtn.classList.add("fa-volume-mute");
  } else {
    volumeBtn.classList.add("fa-volume-off");
  }
}

function handleVolumeBtn() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeRange.value = videoPlayer.volume * 100;
  } else {
    videoPlayer.muted = true;
    volumeRange.value = 0;
  }
  setVolumeIcon();
}

function handleVolumeRange(e) {
  const {
    target: { value }
  } = e;

  videoPlayer.volume = value / 100.0;
  setVolumeIcon();
}

function setTotalTime() {
  totalTime.innerHTML = formatDate(videoPlayer.duration);
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.classList.remove("fa-pause");
  playBtn.classList.add("fa-play");
}

function videoAhead() {
  if (videoPlayer.currentTime + 10.0 <= videoPlayer.duration) {
    videoPlayer.currentTime += 10.0;
  } else {
    videoPlayer.currentTime = videoPlayer.duration - 0.2;
  }
}

function videoBack() {
  if (videoPlayer.currentTime - 10.0 >= 0) {
    videoPlayer.currentTime -= 10.0;
  } else {
    videoPlayer.currentTime = 0.0;
  }
}

function handleKeypress(e) {
  //   e.preventDefault();
  console.log(e);
  if (e.keyCode === 39 || e.key === "ArrowRight") {
    videoAhead();
  } else if (e.keyCode === 37 || e.key === "ArrowLeft") {
    videoBack();
  } else if (e.keyCode === 38 || e.key === "ArrowUp") {
    // volume up
    let val = parseInt(volumeRange.value);
    val += 5;
    if (val > 100) val = 100;

    volumeRange.value = val;
    videoPlayer.volume = val / 100.0;
    setVolumeIcon();
  } else if (e.keyCode === 40 || e.key === "ArrowDown") {
    // volume down
    let val = parseInt(volumeRange.value);
    val -= 5;
    if (val < 0) val = 0;
    volumeRange.value = val;
    videoPlayer.volume = val / 100.0;
    setVolumeIcon();
  } else if (e.keyCode === 32 || e.key === " ") {
    handlePlay();
  } else if (e.keyCode === 77 || e.key === "m") {
    handleVolumeBtn();
  } else if (e.keyCode === 27 || e.key === "Escape") {
  } else if (e.keyCode === 70 || e.key === "f") {
    if (!document.fullscreenElement) {
      goFullscreen();
    } else {
      exitFullscreen();
    }
  }
}

function handleFullscreenChange(e) {
  if (!document.fullscreenElement) {
    setFullscreenBtn();
  } else {
    setExitFullscreenBtn();
  }
}

function handleContainerClick(e) {
  videoContainer.focus();
}

function init() {
  videoPlayer.volume = 0.5;

  videoContainer.addEventListener("keydown", handleKeypress);
  videoContainer.addEventListener("click", handleContainerClick);
  videoPlayer.addEventListener("click", handlePlay);
  videoPlayer.addEventListener("loadeddata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  videoPlayer.addEventListener("ended", handleEnded);

  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  document.addEventListener("fullscreenchange", handleFullscreenChange);

  playBtn.addEventListener("click", handlePlay);
  volumeBtn.addEventListener("click", handleVolumeBtn);
  fullScreenBtn.addEventListener("click", goFullscreen);
  volumeRange.addEventListener("input", handleVolumeRange);
}

if (videoContainer) {
  init();
  videoContainer.focus();
}
