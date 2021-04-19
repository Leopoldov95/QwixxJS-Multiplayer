//Imports
import Player from "./Player.mjs";
import Die from "./Die.mjs";

// main control stuff goes here

//DOM selectors
const startBtn = document.querySelector("#start-btn");
const form = document.querySelector("form");
const gameDisplay = document.querySelector("#game-wrapper");
const titleDisplay = document.querySelector("#title-wrapper");
const playerSelection = document.querySelectorAll("input");
const playersScoreCard = document.querySelectorAll(".player");
const arrayScoreCard = Array.from(playersScoreCard);
const rollBtn = document.querySelector(".btn-roll");
const endBtn = document.querySelector(".btn-end");
const redScoreRow = document.querySelector(".append-red");
const yellowScoreRow = document.querySelector(".append-yellow");
const greenScoreRow = document.querySelector(".append-green");
const blueScoreRow = document.querySelector(".append-blue");
const displayCurrentplayer = document.querySelector(".current-player");

// Game Control
const CONFIG = {
  numPlayers: 0,
  currentPlayer: 0,
  players: [],
};

// Title btn handler
startBtn.addEventListener("click", () => {
  numberOfPlayers();
  displayPlayers();
  titleDisplay.style = "display:none";
  gameDisplay.style = "display:block";
});

//Title number of players
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

rollBtn.addEventListener("click", () => {
  const newDie = new Die();
  setTimeout(() => {
    newDie.genDice();
    newDie.genTitleDice();
  }, 500);
  newDie.roll();
});

// end turn button
endBtn.addEventListener("click", () => {
  console.log(CONFIG.currentPlayer);
  if (CONFIG.currentPlayer === CONFIG.numPlayers - 1) {
    CONFIG.players[0].playerOnClick();
    CONFIG.currentPlayer = 0;

    arrayScoreCard[CONFIG.numPlayers - 1].classList.remove("activePlayer");
    arrayScoreCard[CONFIG.currentPlayer].classList.add("activePlayer");
    console.log(`the current player is player ${CONFIG.currentPlayer + 1}`);
  } else {
    CONFIG.currentPlayer++;
    CONFIG.players[CONFIG.currentPlayer].playerOnClick();
    arrayScoreCard[CONFIG.currentPlayer - 1].classList.remove("activePlayer");
    arrayScoreCard[CONFIG.currentPlayer].classList.add("activePlayer");
    console.log(`the current player is player ${CONFIG.currentPlayer + 1}`);
  }
  displayCurrentplayer.textContent = CONFIG.currentPlayer + 1;
});

//might want to put these functions into a different module

function numberOfPlayers() {
  for (let i of playerSelection) {
    if (i.checked) {
      CONFIG.numPlayers = Number(i.value);
    }
  }
  CONFIG.players = createPlayers();
  CONFIG.players[0].playerOnClick();
}

function displayPlayers() {
  const players = Array.from(playersScoreCard);
  for (let i = 0; i < CONFIG.numPlayers; i++) {
    players[i].style = "display:flex";
  }
}
function createPlayers() {
  let players = [];
  for (let i = 1; i, i <= CONFIG.numPlayers; i++) {
    players.push(new Player(i));
  }

  return players;
}

for (let card of arrayScoreCard) {
  // might want to convert into an array and use indexOf to specify the payer
  card.addEventListener("click", () => {
    // so now by calling the method of the player, 'this' now refers to their own instance of th player class
    // now need to find a way to handle each individual player slection rather than just calling on player one
    CONFIG.players[arrayScoreCard.indexOf(card)].playerOnClick();
    CONFIG.currentPlayer = arrayScoreCard.indexOf(card);
  });
}

// code and handlers for clicking on colored row

redScoreRow.addEventListener("click", (e) => {
  let player = CONFIG.players[CONFIG.currentPlayer];
  player.scoreBoxClick(e, player.redRow, "red");
  // have to update the score here, npt from the class
});
yellowScoreRow.addEventListener("click", (e) => {
  let player = CONFIG.players[CONFIG.currentPlayer];
  player.scoreBoxClick(e, player.yellowRow, "yellow");
});
greenScoreRow.addEventListener("click", (e) => {
  let player = CONFIG.players[CONFIG.currentPlayer];
  player.scoreBoxClick(e, player.greenRow, "green");
});
blueScoreRow.addEventListener("click", (e) => {
  let player = CONFIG.players[CONFIG.currentPlayer];
  player.scoreBoxClick(e, player.blueRow, "blue");
});
