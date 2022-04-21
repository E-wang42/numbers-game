"use strict";

//state elements
const score0Ele = document.querySelector("#score--0");
const score1Ele = document.getElementById("score--1");
const current0Ele = document.getElementById("current--0");
const current1Ele = document.querySelector("#current--1");
const diceEle = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const player0Section = document.querySelector(".player--0");
const player1Section = document.querySelector(".player--1");

//state variables
let scores, currentScore, activePlayer, playing;

//initialize
const initGame = function () {
  //reset all values
  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;
  //reset active player
  player0Section.classList.add("player--active");
  player1Section.classList.remove("player--active");
  player0Section.classList.remove("player--winner");
  player1Section.classList.remove("player--winner");
  //starting conditions
  diceEle.classList.add("hidden");
  //default values
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  //hide dice
  diceEle.classList.add("hidden");
};

//reset score and switch players function
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Section.classList.toggle("player--active");
  player1Section.classList.toggle("player--active");
  currentScore = 0;
};

//dice rolling functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    //1. random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display result
    diceEle.classList.remove("hidden");
    diceEle.src = `dice-${dice}.png`;

    //3. check for termination and if statement
    if (dice !== 1) {
      //add to score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch players and reset points
      switchPlayer();
    }
  }
});

//hold button functionality
btnHold.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. check if active player reached requirement
    if (scores[activePlayer] >= 50) {
      //end game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEle.classList.add("hidden");
    } else {
      switchPlayer();
    }
  }
});

//new game button functionality
btnNew.addEventListener("click", initGame);
