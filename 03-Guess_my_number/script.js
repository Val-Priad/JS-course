"use strict";

const guessEl = document.querySelector(".guess");
const message = document.querySelector(".message");
const baseScore = document.querySelector(".score");
const body = document.body;
const number = document.querySelector(".number");
const highestScore = document.querySelector(".highscore");

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let bestScore = 0;
let score = 20;

function decrementScore() {
  score--;
  baseScore.textContent = score;
}

function setMessage(msg) {
  message.textContent = msg;
}

function resetTheGame() {
  body.style.backgroundColor = "#222";
  number.style.width = "15rem";
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  baseScore.textContent = score;
  number.textContent = "?";
  guessEl.value = "";
  setMessage("Start guessing...");
}

function showWinScreen() {
  body.style.backgroundColor = "#60b347";
  number.style.width = "30rem";
  number.textContent = secretNumber;
}
function updateBestScore() {
  if (score > bestScore) {
    bestScore = score;
    highestScore.textContent = bestScore;
  }
}
document.querySelector(".again").addEventListener("click", resetTheGame);

document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (score > 1) {
    if (!guess) {
      setMessage("❌ No number");
    } else if (guess < 1 || guess > 20) {
      setMessage("🚀 Number out of range");
    } else if (guess === secretNumber) {
      setMessage("🎉 Correct number!");
      updateBestScore();
      showWinScreen();
    } else {
      setMessage(guess > secretNumber ? "📈  Too high" : "📉  Too low");
      decrementScore();
    }
  } else {
    decrementScore();
    setMessage("💔 You lost");
  }
});
