//// TASKS///////
/* 
- reset dice selection when user scores
- dont allow player to roll or select scores when clicking penalty
*/

//Imports
import Player from "./Player.mjs";
import Die from "./Die.mjs";
import config from "./config.mjs";

// main control stuff goes here

//DOM selectors
const startBtn = document.querySelector("#start-btn");
const rulesBtn = document.querySelector("#rule-btn");
const helpBtn = document.querySelector("#help-btn");
const closeRulesBtn = document.querySelector(".rules-exit");
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

rulesBtn.addEventListener("click", () => {
  document.querySelector("#rules").style = "display:block";
});
helpBtn.addEventListener("click", () => {
  document.querySelector("#rules").style = "display:block";
});

closeRulesBtn.addEventListener("click", () => {
  document.querySelector("#rules").style = "display:none";
});

//Title number of players
form.addEventListener("submit", (e) => {
  e.preventDefault();
});

rollBtn.addEventListener("click", () => {
  if (
    config.players[config.currentMainPlayer].rollsLeft > 0 &&
    config.checkLegalMove()
  ) {
    const newDie = new Die();
    setTimeout(() => {
      newDie.genDice();
    }, 500);
    newDie.roll();
    config.players[config.currentMainPlayer].rollsLeft--;
  } else {
    //alert("Only 1 roll per turn");
    config.displayWarning("Only 1 roll per turn");
  }
});

// end turn button
endBtn.addEventListener("click", () => {
  config.playerEndTurn(arrayScoreCard, displayCurrentplayer);
});

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
    if (config.checkLegalMove()) {
      let player = config.players[config.currentMainPlayer];

      player.scoreBoxClick(i, player.redRow, "red", player.redScore);
    } else {
      let player = config.players[config.currentPlayer];

      player.scoreBoxClick(i, player.redRow, "red", player.redScore);
    }
  });
}
for (let i of allyellowScoreBoxes) {
  i.addEventListener("click", () => {
    if (config.checkLegalMove()) {
      let player = config.players[config.currentMainPlayer];
      player.scoreBoxClick(i, player.yellowRow, "yellow", player.yellowScore);
    } else {
      let player = config.players[config.currentPlayer];
      player.scoreBoxClick(i, player.yellowRow, "yellow", player.yellowScore);
    }
  });
}
for (let i of allgreenScoreBoxes) {
  i.addEventListener("click", () => {
    if (config.checkLegalMove()) {
      // use the white dice rulee handler here
      let player = config.players[config.currentMainPlayer];
      player.scoreBoxClick(i, player.greenRow, "green", player.greenScore);
    } else {
      let player = config.players[config.currentPlayer];
      player.scoreBoxClick(i, player.greenRow, "green", player.greenScore);
    }
  });
}
for (let i of allblueScoreBoxes) {
  i.addEventListener("click", () => {
    if (config.checkLegalMove()) {
      let player = config.players[config.currentMainPlayer];
      player.scoreBoxClick(i, player.blueRow, "blue", player.blueScore);
    } else {
      let player = config.players[config.currentPlayer];
      player.scoreBoxClick(i, player.blueRow, "blue", player.blueScore);
    }
  });
}

// use this methodology to generate the color boxes, better for programming!!!!!!!
// just change the text content of each box, no need to map over and create an entire new box every time!!! just update the inner value from the player map array
for (let box of allPenaltyBoxes) {
  box.addEventListener("click", () => {
    if (config.checkLegalMove()) {
      if (box.textContent !== "X") {
        let player = config.players[config.currentMainPlayer];
        player.handlePenalty(allPenaltyBoxes, box);
        // also want to end the currentplayers turn and switch to the next one
        // config.playerEndTurn(arrayScoreCard, displayCurrentplayer);
      }
    } else {
      config.displayWarning("it is not your turn");
    }
  });
}

////EVENT DELEGATION HANDLING ///////
//// dice selection /////////////////
// may want to pass these functions into the player helper object

document.querySelector(".dice-row").addEventListener("click", (e) => {
  if (e.target.className.includes("die")) {
    if (config.players[config.currentMainPlayer].rollsLeft === 0) {
      if (
        config.checkSelectedDie() < 2 ||
        e.target.classList.contains("selected")
      ) {
        e.target.classList.toggle("selected");
        config.checkSelectedDie();
        config.checkValidDiceSelected();
      }
    } else {
      config.displayWarning("You must roll first");
    }
  }
});
