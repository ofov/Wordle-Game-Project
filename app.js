/*-------------------------------- Constants --------------------------------*/
const MAX_ROWS = 6;
const WORD_LENGTH = 5;
const LEVELS = [
  { word: "MOUSE", hint: "You click with it" },
  { word: "PIXEL", hint: "A tiny dot on a screen" },
  { word: "CLOUD", hint: "Where files live online" },
  { word: "ARRAY", hint: "An ordered list in code" },
  { word: "DEBUG", hint: "Find and fix errors" },
  { word: "STACK", hint: "Last in, first out" },
  { word: "QUERY", hint: "A question for a database" },
  { word: "AGILE", hint: "A flexible way to run projects" },
  { word: "MERGE", hint: "Combine two Git branches" },
  { word: "CACHE", hint: "Fast storage for repeated data" }
];
/*---------------------------- Variables (state) ----------------------------*/
let currentlevel = 1;
let gameOver = false;
let row = 0;
let guess = '';
let answer = '';
let levelScore = 0; let totalScore = 0;
/*------------------------ Cached Element References ------------------------*/
const keyboardEl = document.querySelector('.keyboard');
const messageEl = document.getElementById('level');
const hintDisplay = document.getElementById('Hint');
const keys = document.querySelectorAll('.key');
const scoreEl = document.getElementById('Score');
const tryAgainBtn = document.getElementById('try');

const sqr0EL = document.getElementById('0');
const sqr1EL = document.getElementById('1');
const sqr2EL = document.getElementById('2');
const sqr3EL = document.getElementById('3');
const sqr4EL = document.getElementById('4');
const sqr5EL = document.getElementById('5');
const sqr6EL = document.getElementById('6');
const sqr7EL = document.getElementById('7');
const sqr8EL = document.getElementById('8');
const sqr9EL = document.getElementById('9');
const sqr10EL = document.getElementById('10');
const sqr11EL = document.getElementById('11');
const sqr12EL = document.getElementById('12');
const sqr13EL = document.getElementById('13');
const sqr14EL = document.getElementById('14');
const sqr15EL = document.getElementById('15');
const sqr16EL = document.getElementById('16');
const sqr17EL = document.getElementById('17');
const sqr18EL = document.getElementById('18');
const sqr19EL = document.getElementById('19');
const sqr20EL = document.getElementById('20');
const sqr21EL = document.getElementById('21');
const sqr22EL = document.getElementById('22');
const sqr23EL = document.getElementById('23');
const sqr24EL = document.getElementById('24');
const sqr25EL = document.getElementById('25');
const sqr26EL = document.getElementById('26');
const sqr27EL = document.getElementById('27');
const sqr28EL = document.getElementById('28');
const sqr29EL = document.getElementById('29');

const tiles = [
  sqr0EL, sqr1EL, sqr2EL, sqr3EL, sqr4EL,
  sqr5EL, sqr6EL, sqr7EL, sqr8EL, sqr9EL,
  sqr10EL, sqr11EL, sqr12EL, sqr13EL, sqr14EL,
  sqr15EL, sqr16EL, sqr17EL, sqr18EL, sqr19EL,
  sqr20EL, sqr21EL, sqr22EL, sqr23EL, sqr24EL,
  sqr25EL, sqr26EL, sqr27EL, sqr28EL, sqr29EL
];
/*-------------------------------- Functions --------------------------------*/
function startLevel() {
  answer = LEVELS[currentlevel-1].word;
  guess = '';
  row = 0;
  gameOver = false;

  messageEl.textContent = `Level ${currentlevel}`;
  hintDisplay.textContent = 'Hint: ' + LEVELS[currentlevel-1].hint;
  tiles.forEach(tile => {
    tile.textContent = '';
    tile.className = 'sqr';
  });

}


function addLetter(letter) {
  if (gameOver===true) return;
  if (guess.length < WORD_LENGTH) {
    guess += letter;
    updateBoard();
  }
}

function removeLetter() {
  if (gameOver===true) return;
  if (guess.length === 0) return;
guess = guess.substring(0, guess.length - 1);
  updateBoard();
}
function scoreGuess(guess, answer) {
  const result = Array(WORD_LENGTH).fill('gray');
  const answerLetters = answer.split('');
  const guessLetters = guess.split('');

  for (let i = 0; i < WORD_LENGTH; i++) {
    if (guessLetters[i] === answerLetters[i]) {
      result[i] = 'green';
      answerLetters[i] = null;
    }
  }
  for (let i = 0; i < WORD_LENGTH; i++) {
    if (result[i] === 'green') continue;
    const idx = answerLetters.indexOf(guessLetters[i]);
    if (idx !== -1) {
      result[i] = 'yellow';
      answerLetters[idx] = null;
    }
  }
  return result;
}

function updateBoard() {
  for (let i = 0; i < WORD_LENGTH; i++) {
    const tileIndex = row * WORD_LENGTH + i;
    tiles[tileIndex].textContent = guess[i] ;
  }
}
function calScore(attempts) {
  if (attempts === 1) return 1000;
  if (attempts === 2) return 800;
  if (attempts === 3) return 600;
  if (attempts === 4) return 400;
  if (attempts === 5) return 200;
  return 100;
}
function submitGuess() {
  if (gameOver===true) return;

  if (guess.length !== WORD_LENGTH) {
    messageEl.textContent = 'Not enough letters!';
    return;
  }

  const result = scoreGuess(guess, answer);

  for(let i=0; i <WORD_LENGTH;i++) {
    const tileIndex = row * WORD_LENGTH + i;
    tiles[tileIndex].classList.add(result[i]);
  }

  if (guess === answer) {
     levelScore= calScore(row + 1);
    totalScore += levelScore;
  scoreEl.textContent = `Score : ${totalScore}`;
    gameOver = true;
     if (currentlevel >= LEVELS.length) {
    messageEl.textContent = ` You finished all levels! Final score: ${totalScore}`;
         document.getElementById("try").classList.remove("hidden");
    return;
  }
  messageEl.textContent = `Level ${currentlevel} passed! +${levelScore} points`;   

  setTimeout(() => {
  currentlevel++;
  startLevel();
}, 2000);
    return ;
  }
  row++;
  guess = '';
  if (row >= MAX_ROWS) {
    gameOver = true;
    messageEl.textContent = ` You lost! Try Again Final score: ${totalScore}`;
     document.getElementById("try").classList.remove("hidden");
  }
}

// Fisher-Yates algorithm
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}





/*----------------------------- Event Listeners -----------------------------*/

document.addEventListener('keydown', (event) => {
  if (gameOver===true) return;
  const key = event.key.toUpperCase();

  if (key === 'ENTER') {
    submitGuess();
  } else if (key === 'BACKSPACE') {
    removeLetter();
  } else if (/^[A-Z]$/.test(key)) {
    addLetter(key);
  }
});

keyboardEl.addEventListener('click', (event) => {
  const button = event.target.closest('.key');
  if (!button) return;
  const key = button.id;
  if (key === 'Backspace') {
    removeLetter();
  } if (key === 'Enter') {
submitGuess();
  }
  else if (/^[A-Z]$/.test(key)) {
    addLetter(key);
  }
}); 

tryAgainBtn.addEventListener("click", function () {
  currentlevel = 1;
  gameOver = false;
  row = 0;
  guess = '';
  answer = '';
  levelScore = 0;
  totalScore = 0;
  scoreEl.textContent = 'Score : 0';
  document.getElementById("try").classList.add("hidden");
  startLevel();  
});
/*-------------------------------- Init -------------------------------------*/
shuffle(LEVELS);
  startLevel();
