// rain bg sound
const aud = document.getElementById("bg-sound");
const icon = document.getElementById("sound-icon");

function playPause() {
  if (aud.paused) {
    aud.play();
    icon.setAttribute("d", "M0 5.77V11.77H4L9 16.77V0.77L4 5.77H0ZM7 5.6V11.94L4.83 9.77H2V7.77H4.83L7 5.6ZM13.5 8.77C13.5 7 12.48 5.48 11 4.74V12.79C12.48 12.06 13.5 10.54 13.5 8.77ZM11 0V2.06C13.89 2.92 16 5.6 16 8.77C16 11.94 13.89 14.62 11 15.48V17.54C15.01 16.63 18 13.05 18 8.77C18 4.49 15.01 0.91 11 0Z")
  } else {
    aud.pause();
    icon.setAttribute("d", "M1.41 0L0 1.41L4.36 5.77L4.07 6.07H0.0699999V12.07H4.07L9.07 17.07V10.48L13.25 14.66C12.6 15.15 11.87 15.54 11.07 15.77V17.83C12.41 17.53 13.64 16.91 14.68 16.08L16.73 18.13L18.14 16.72L1.41 0ZM7.07 12.24L4.9 10.07H2.07V8.07H4.9L5.78 7.19L7.07 8.48V12.24ZM16.07 9.07C16.07 9.89 15.92 10.68 15.66 11.41L17.19 12.94C17.75 11.77 18.07 10.46 18.07 9.07C18.07 4.79 15.08 1.21 11.07 0.3V2.36C13.96 3.22 16.07 5.9 16.07 9.07ZM9.07 1.07L7.19 2.95L9.07 4.83V1.07ZM13.57 9.07C13.57 7.3 12.55 5.78 11.07 5.04V6.83L13.55 9.31C13.56 9.23 13.57 9.15 13.57 9.07Z")
  }
}

// button click sound
const clickSound = new Audio('../assets/audio/click_001.wav');

document.querySelectorAll('.main-btn').forEach(button => {
  button.addEventListener('click', () => {
    clickSound.currentTime = 0; // Rewind to the start so rapid clicks play repeatedly
    clickSound.play();
  });
});

// close window sound
const closeSound = new Audio('../assets/audio/bong_001.ogg');

document.querySelectorAll('.close-window').forEach(button => {
  button.addEventListener('click', () => {
    closeSound.currentTime = 0; // Rewind to the start so rapid clicks play repeatedly
    closeSound.play();
  });
});