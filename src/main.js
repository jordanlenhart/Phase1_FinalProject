// VIDEO ARRAY AND FUNCTION
const video = document.getElementById('bgVideo');

const videos = [
  'videos/emirates.mp4',
  'videos/etihad.mp4',
  'videos/Wembley.mp4',
  'videos/tottenham.mp4',
  'videos/ManU.mp4'
];

let current = 0;

// PLAY VIDEO
function playVideo(index) {
  video.src = videos[index];
  video.load();
  video.play();
  fadeIn();

  // WHEN VIDEO IS CLOSE TO ENDING, FADE INTO THE NEXT VIDEO
  video.onended = () => {
    fadeOut(() => {
      current = (current + 1) % videos.length;
      playVideo(current);
    });
  };
}

function fadeIn() {
  video.style.opacity = '1';
}

function fadeOut(callback) {
  video.style.opacity = '0';
  setTimeout(callback, 1000);
}

playVideo(current);
