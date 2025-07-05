"use strict";

const goal = 20;
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const btnReset = document.querySelector(".btn--new");
const currentScorePlayer1 = document.getElementById("current--0");
const currentScorePlayer2 = document.getElementById("current--1");
const scorePlayer1 = document.getElementById("score--0");
const scorePlayer2 = document.getElementById("score--1");
const player1 = document.querySelector(".player--0");
const player2 = document.querySelector(".player--1");
const diceImg = document.querySelector(".dice");
let dice;
let gameFinished = false;

function isPlayer1() {
  return player1.classList.contains("player--active");
}

function getCurrentPlayer() {
  return isPlayer1() ? player1 : player2;
}

function getOppositePlayer() {
  return isPlayer1() ? player2 : player1;
}

function getPlayerCurrentScore() {
  return isPlayer1() ? currentScorePlayer1 : currentScorePlayer2;
}

function getPlayerScore() {
  return isPlayer1() ? scorePlayer1 : scorePlayer2;
}

function setScore(obj, value) {
  obj.textContent = value;
}

function getScore(obj) {
  return Number(obj.textContent);
}

function clearCurScore() {
  setScore(getPlayerCurrentScore(), 0);
}

function clearScores() {
  setScore(scorePlayer1, 0);
  setScore(scorePlayer2, 0);
  setScore(currentScorePlayer1, 0);
  setScore(currentScorePlayer2, 0);
}

function clearActive() {
  getCurrentPlayer().classList.remove("player--active");
}

function setActivePlayer(obj) {
  obj.classList.add("player--active");
}

function setWinner() {
  getCurrentPlayer().classList.add("player--winner");
  gameFinished = true;
}

function clearWinners() {
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");
}

function hideDice() {
  diceImg.classList.add("hidden");
}

function displayDiceRoll() {
  diceImg.classList.remove("hidden");
  diceImg.src = `dice-${dice}.png`;
}

function switchPlayer() {
  let oppositePlayer = getOppositePlayer();
  clearActive();
  setActivePlayer(oppositePlayer);
}
function currentPlayerWins() {
  return getScore(getPlayerScore()) >= goal;
}

function rollDice() {
  if (gameFinished) {
    return;
  }
  dice = Math.trunc(Math.random() * 6) + 1;
  displayDiceRoll();
  if (dice === 1) {
    clearCurScore();
    switchPlayer();
  } else {
    setScore(
      getPlayerCurrentScore(),
      Number(getPlayerCurrentScore().textContent) + dice
    );
  }
}

function hold() {
  if (gameFinished) {
    return;
  }
  setScore(
    getPlayerScore(),
    Number(getPlayerCurrentScore().textContent) +
      Number(getPlayerScore().textContent)
  );
  if (currentPlayerWins()) {
    setWinner();
    clearActive();
  } else {
    clearCurScore();
    switchPlayer();
  }
}

function reset() {
  gameFinished = false;
  hideDice();
  clearScores();
  clearWinners();
  setActivePlayer(player1);
}

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnReset.addEventListener("click", reset);
