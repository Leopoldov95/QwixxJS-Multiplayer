//Imports
import Player from "./Player.mjs";
import Die from "./Die.mjs";
import config from "./config.mjs";

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
const allPenaltyBoxes = Array.from(document.querySelectorAll(".penalty-box"));
const allredScoreBoxes = document.querySelectorAll(".score-box-red");
const allyellowScoreBoxes = document.querySelectorAll(".score-box-yellow");
const allgreenScoreBoxes = document.querySelectorAll(".score-box-green");
const allblueScoreBoxes = document.querySelectorAll(".score-box-blue");

// Title btn handler
startBtn.addEventListener("click", () => {
  config.numberOfPlayers(playerSelection, createPlayers);
  config.displayPlayers(playersScoreCard);
  titleDisplay.style = "display:none";
  gameDisplay.style = "display:block";
});

//Title number of players
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

rollBtn.addEventListener("click", () => {
  if (config.players[config.currentPlayer].rollsLeft > 0) {
    const newDie = new Die();
    setTimeout(() => {
      newDie.genDice();
      newDie.genTitleDice();
    }, 500);
    newDie.roll();
    config.players[config.currentPlayer].rollsLeft--;
  }
});

// end turn button
endBtn.addEventListener("click", () => {
  console.log(config.currentPlayer);
  config.playerEndTurn(arrayScoreCard, displayCurrentplayer);
  /*  if (config.currentPlayer === config.numPlayers - 1) {
    config.players[0].playerOnClick();
    config.currentPlayer = 0;

    arrayScoreCard[config.numPlayers - 1].classList.remove("activePlayer");
    arrayScoreCard[config.currentPlayer].classList.add("activePlayer");
    console.log(`the current player is player ${config.currentPlayer + 1}`);
  } else {
    config.currentPlayer++;
    config.players[config.currentPlayer].playerOnClick();
    arrayScoreCard[config.currentPlayer - 1].classList.remove("activePlayer");
    arrayScoreCard[config.currentPlayer].classList.add("activePlayer");
    console.log(`the current player is player ${config.currentPlayer + 1}`);
  }
  displayCurrentplayer.textContent = config.currentPlayer + 1; */
});

//might want to put these functions into a different module
//config.numberOfPlayers(playerSelection, createPlayers,playerOnClick)

// function is used to communicate to player class and update the master game state

function createPlayers() {
  let players = [];
  for (let i = 1; i, i <= config.numPlayers; i++) {
    players.push(new Player(i));
  }

  return players;
}

for (let card of arrayScoreCard) {
  // might want to convert into an array and use indexOf to specify the payer
  card.addEventListener("click", () => {
    // so now by calling the method of the player, 'this' now refers to their own instance of th player class
    // now need to find a way to handle each individual player slection rather than just calling on player one
    config.players[arrayScoreCard.indexOf(card)].playerOnClick();
    config.currentPlayer = arrayScoreCard.indexOf(card);
  });
}

// code and handlers for clicking on colored row

for (let i of allredScoreBoxes) {
  i.addEventListener("click", () => {
    let player = config.players[config.currentPlayer];

    player.scoreBoxClick(i, player.redRow, "red", player.redScore);
  });
}
for (let i of allyellowScoreBoxes) {
  i.addEventListener("click", () => {
    let player = config.players[config.currentPlayer];
    player.scoreBoxClick(i, player.yellowRow, "yellow", player.yellowScore);
  });
}
for (let i of allgreenScoreBoxes) {
  i.addEventListener("click", () => {
    let player = config.players[config.currentPlayer];
    player.scoreBoxClick(i, player.greenRow, "green", player.greenScore);
  });
}
for (let i of allblueScoreBoxes) {
  i.addEventListener("click", () => {
    let player = config.players[config.currentPlayer];
    player.scoreBoxClick(i, player.blueRow, "blue", player.blueScore);
  });
}

// use this methodology to generate the color boxes, better for programming!!!!!!!
// just change the text content of each box, no need to map over and create an entire new box every time!!! just update the inner value from the player map array
for (let box of allPenaltyBoxes) {
  box.addEventListener("click", () => {
    if (box.textContent !== "X") {
      let player = config.players[config.currentMainPlayer];
      player.handlePenalty(allPenaltyBoxes, box);
      // also want to end the currentplayers turn and switch to the next one
      config.playerEndTurn(arrayScoreCard, displayCurrentplayer);
    }
  });
}

////EVENT DELEGATION HANDLING ///////
//// dice selection /////////////////
// may want to pass these functions into the player helper object

document.querySelector(".dice-row").addEventListener("click", (e) => {
  if (e.target.className.includes("die")) {
    if (
      config.checkSelectedDie() < 2 ||
      e.target.classList.contains("selected")
    ) {
      e.target.classList.toggle("selected");
      config.checkSelectedDie();
      config.checkValidDiceSelected();
    }
  }
});
