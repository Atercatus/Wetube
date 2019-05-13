const recordContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordButton");
const videoPreview = document.getElementById("jsVideoPreview");

let videoRecorder;

const handleVideoData = event => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

const startRecording = stream => {
  videoRecorder = new MediaRecorder(stream);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  videoRecorder.removeEventListener("click", getVideo);
  recordBtn.addEventListener("click", stopRecording);
};

const stopRecording = () => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const getVideo = async function() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: { min: 640, ideal: 1280, max: 1920 },
        height: { min: 400, ideal: 720, max: 1080 },
        aspectRatio: 1.777777778
      }
    });

    videoPreview.srcObject = stream;
    videoPreview.play();
    videoPreview.muted = true;
    recordBtn.innerHTML = "Stop recording";
    startRecording(stream);
  } catch (err) {
    console.log(err);
    recordBtn.innerHTML = "😢 Can't record";
    recordBtn.removeEventListener("click", getVideo);
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

function init() {
  recordBtn.addEventListener("click", getVideo);
}

if (recordContainer) {
  init();
}
