
// DOM grabbers
const root = document.querySelector(':root');
const themeBtn = document.querySelector('#theme-btn');
const toggle = document.querySelector('#toggle');
const tempoSpeed = document.querySelector('#tempo-speed');
const metronomeBase = document.querySelector('#metronome-base');
const playPauseBtn = document.querySelector('#play-pause-btn');
const girderOne = document.querySelector('#girder-one');
const girderTwo = document.querySelector('#girder-two');
const girderThree = document.querySelector('#girder-three');
const tempoBtnDown = document.querySelector('#tempo-btn-down');
const tempoSlider = document.querySelector('#tempo-slider');
const tempoBtnUp = document.querySelector('#tempo-btn-up');

// Session state
let tempoVal = 100;
let playing = false;
let lightTheme = false;

// Storing interval identifier
let metronomeInterval;

// Helper functions
// Trigger beep
const beep = () => snd.play();

// Update display color and speed indicator
const updateDisplay = () => {
  tempoSpeed.textContent = tempoVal;
  root.style.setProperty('--temperature', `rgb(${0 + tempoVal}, 0, ${258 - tempoVal})`);
};

// Update play/pause btn image
const handlePlayPauseTransform = () => {
  girderOne.classList.toggle('girder__one--play');
  girderOne.classList.toggle('girder__one--pause');
  girderTwo.classList.toggle('girder__two--play');
  girderTwo.classList.toggle('girder__two--pause');
  girderThree.classList.toggle('girder__two--play');
  girderThree.classList.toggle('girder__two--pause');
}

// Main controller function
const updateMetronome = () => {
  if (playing) {
    clearInterval(metronomeInterval);
    metronomeInterval = setInterval(beep, 1000 * 60 / tempoVal);
    metronomeBase.style.animation = `metronome ${60 / tempoVal}s alternate infinite linear`;
  } else {
    clearInterval(metronomeInterval);
    metronomeBase.style.animation = 'none';
  }
  updateDisplay(metronomeInterval);
};

// Event handlers
themeBtn.addEventListener('click', () => {
  if (lightTheme) {
    toggle.style.left = '0';
    root.style.setProperty('--background', '#000');
    root.style.setProperty('--text', '#fff');
  } else {
    toggle.style.left = '50%';
    root.style.setProperty('--background', '#fff');
    root.style.setProperty('--text', '#000');
  }
  lightTheme = !lightTheme;
});

playPauseBtn.addEventListener('click', () => {
  playing = !playing;
  updateMetronome();
  handlePlayPauseTransform();
});

tempoBtnDown.addEventListener('click', () => {
  tempoVal--;
  tempoSlider.setAttribute('value', tempoVal);
  updateMetronome();
});

tempoSlider.addEventListener('change', e => {
  tempoVal = e.target.value;
  updateMetronome();
});

tempoBtnUp.addEventListener('click', () => {
  tempoVal++;
  tempoSlider.setAttribute('value', tempoVal);
  updateMetronome();
});
