const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('button');
const bonkSound = document.querySelector('audio');
const startScreen = document.querySelector('.start-screen');
const showScore = document.querySelector('.show-score');

let score = 0;
let lastHole;
let timeUp = false;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    scoreBoard.classList.remove('add');
    if (!timeUp) peep();
  }, time);
}


function start() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  scoreBoard.classList.remove('add');
  startScreen.classList.add('hide');

  // start peep
  peep();

  setTimeout(() => {
    timeUp = true;
    startScreen.classList.remove('hide');

    if (score > 0) {
  // Function to show the Score You got and stop packground music!!!
      bonkSound.pause();
      showScore.classList.add('show');
      const message = 'Your score: ' + score + (score >= 10 ? " GREAT!" : '');
      showScore.textContent = message;
    }

  }, 100000 ); // change Time Of The Game (10000))!!!
}

// function to count and play sound !!!

function bonk(e) {
  bonkSound.currentTime = 0;
  if (!timeUp) {
    bonkSound.play();
    score++;
    scoreBoard.textContent = score;
  }
}

// click listener on mole !!!

moles.forEach(mole => {
  mole.addEventListener('click', bonk);
});

// click listener on start button !!!

btnStart.addEventListener('click', start);
