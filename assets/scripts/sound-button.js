// rain bg sound
const aud = document.getElementById("bg-sound");
const icon = document.getElementById("sound-icon");

function playPause() {
  if (aud.paused) {
    aud.play();
    icon.src = "./assets/icons/pause-icon.png";
  } else {
    aud.pause();
    icon.src = "./assets/icons/play-icon.png";
  }
}

// button click sound
const clickSound = new Audio('./assets/audio/click_001.wav');
clickSound.volume = 0.5; // Set volume to 50%

document.querySelectorAll('.main-btn').forEach(button => {
  button.addEventListener('click', () => {
    clickSound.currentTime = 0; // Rewind to the start so rapid clicks play repeatedly
    clickSound.play();
  });
});

// close window sound
const closeSound = new Audio('./assets/audio/bong_001.ogg');
closeSound.volume = 0.5

document.querySelectorAll('.close-window').forEach(button => {
  button.addEventListener('click', () => {
    closeSound.currentTime = 0;
    closeSound.play();
  });
});