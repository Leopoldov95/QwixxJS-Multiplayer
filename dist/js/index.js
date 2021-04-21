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
const displayCurrentplayer = document.querySelector(".current-player");
const allPenaltyBoxes = document.querySelectorAll(".penalty-box");
const allredScoreBoxes = document.querySelectorAll(".score-box-red");
const allyellowScoreBoxes = document.querySelectorAll(".score-box-yellow");
const allgreenScoreBoxes = document.querySelectorAll(".score-box-green");
const allblueScoreBoxes = document.querySelectorAll(".score-box-blue");

// Game Control
const CONFIG = {
  isOneLocked: false,
  isTwoLocked: false,
  isGameOver: false,
  isPlayerTurnOver: false,
  numPlayers: 0,
  currentPlayer: 0,
  players: [],
};

const gameOver = () => {
  if (CONFIG.isGameOver) alert("the game is over");
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

// function is used to communicate to player class and update the master game state
const playerFn = {
  // may want to place helper functions here that the player could use use and then pass the entire object to the player
};
function grabFromPlayer(config) {
  if (!config.isOneLocked) {
    config.isOneLocked = true;
  } else {
    config.isTwoLocked = true;
    config.isGameOver = true;
    gameOver();
  }
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
    players.push(new Player(i, grabFromPlayer, CONFIG));
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

for (let i of allredScoreBoxes) {
  i.addEventListener("click", () => {
    let player = CONFIG.players[CONFIG.currentPlayer];
    player.scoreBoxClick(i, player.redRow, "red", player.redScore);
  });
}
for (let i of allyellowScoreBoxes) {
  i.addEventListener("click", () => {
    let player = CONFIG.players[CONFIG.currentPlayer];
    player.scoreBoxClick(i, player.yellowRow, "yellow", player.yellowScore);
  });
}
for (let i of allgreenScoreBoxes) {
  i.addEventListener("click", () => {
    let player = CONFIG.players[CONFIG.currentPlayer];
    player.scoreBoxClick(i, player.greenRow, "green", player.greenScore);
  });
}
for (let i of allblueScoreBoxes) {
  i.addEventListener("click", () => {
    let player = CONFIG.players[CONFIG.currentPlayer];
    player.scoreBoxClick(i, player.blueRow, "blue", player.blueScore);
  });
}

// use this methodology to generate the color boxes, better for programming!!!!!!!
// just change the text content of each box, no need to map over and create an entire new box every time!!! just update the inner value from the player map array
for (let box of allPenaltyBoxes) {
  box.addEventListener("click", () => {
    console.log(box.textContent);
  });
}

////EVENT DELEGATION HANDLING ///////
//// dice selection /////////////////

function checkSelectedDie() {
  let selected = 0;
  for (let die of document.querySelectorAll(".die")) {
    if (die.className.includes("selected")) {
      selected += 1;
    }
  }
  return selected;
}

function checkValidDiceSelected() {
  let total = 0;
  let dieNum = [];
  for (let die of document.querySelectorAll(".die")) {
    if (die.className.includes("selected")) {
      dieNum.push(Number(die.getAttribute("value")));
    }
  }
  if (dieNum.length === 2) {
    for (let i of dieNum) {
      total += i;
    }

    return total;
  }
}

document.querySelector(".dice-row").addEventListener("click", (e) => {
  if (e.target.className.includes("die")) {
    if (checkSelectedDie() < 2 || e.target.classList.contains("selected")) {
      e.target.classList.toggle("selected");
      checkSelectedDie();
      checkValidDiceSelected();
    }
  }
});
