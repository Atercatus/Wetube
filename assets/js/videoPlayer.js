// let videoPlayer;
// videoPlayer = videoContainer.querySelector("video");
const videoContainer = document.getElementById("jsVideoPlayer");
const videoPlayer = document.querySelector("#jsVideoPlayer video");
const playBtn = document.getElementById("jsPlayButton");
const volumeBtn = document.getElementById("jsVolumeButton");
const fullScreenBtn = document.getElementById("jsFullScreen");
const currentTime = document.getElementById("currentTime");
const totalTime = document.getElementById("totalTime");

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
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
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
  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
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
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
}

function handleVolume() {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else {
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
}

function setTotalTime() {
  totalTime.innerHTML = formatDate(videoPlayer.duration);
}

function setCurrentTime() {
  currentTime.innerHTML = formatDate(videoPlayer.currentTime);
}

function handleEnded() {
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
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
  } else if (e.keyCode === 40 || e.key === "ArrowDown") {
    // volume down
  } else if (e.keyCode === 32 || e.key === " ") {
    handlePlay();
  } else if (e.keyCode === 77 || e.key === "m") {
    handleVolume();
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
  videoContainer.addEventListener("keydown", handleKeypress);
  videoContainer.addEventListener("click", handleContainerClick);
  videoPlayer.addEventListener("click", handlePlay);
  videoPlayer.addEventListener("loadeddata", setTotalTime);
  videoPlayer.addEventListener("timeupdate", setCurrentTime);
  videoPlayer.addEventListener("ended", handleEnded);

  document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
  document.addEventListener("mozfullscreenchange", handleFullscreenChange);
  document.addEventListener("fullscreenchange", handleFullscreenChange);
  console.log(document.webkitFullscreenEnabled);
  console.log(document.webkitfullscreenchange);
  console.log(document.onwebkitfullscreenchange);
  playBtn.addEventListener("click", handlePlay);
  volumeBtn.addEventListener("click", handleVolume);
  fullScreenBtn.addEventListener("click", goFullscreen);
}

if (videoContainer) {
  init();
  videoContainer.focus();
}
