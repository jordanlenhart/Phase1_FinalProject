// Video Functions
const video = document.getElementById('bgVideo');

const videos = [
  'videos/emirates.mp4',
  'videos/Wembley.mp4',
];

let current = 0;

function playVideo(index) {
  video.src = videos[index];
  video.load();
  video.play();
  fadeIn();

  // When the video is about to end, fade out
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
