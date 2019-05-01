import "../scss/styles.scss";
import "./videoPlayer.js";

window.addEventListener("keydown", function(e) {
  if (
    e.key == " " &&
    (e.target == document.body ||
      e.target == document.getElementById("jsVideoPlayer"))
  ) {
    e.preventDefault();
  }
});

// async를 크롬이 이해하지 못하므로
// polyfill을 설치해야한다.
