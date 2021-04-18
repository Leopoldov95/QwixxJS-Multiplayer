//Imports
import Player from "./Player.mjs";

// main control stuff goes here

//DOM selectors
const startBtn = document.querySelector("#start-btn");
const form = document.querySelector("form");
const gameDisplay = document.querySelector("#game-wrapper");
const titleDisplay = document.querySelector("#title-wrapper");
const playerSelection = document.querySelectorAll("input");
const playersScoreCard = document.querySelectorAll(".player");
const arrayScoreCard = Array.from(playersScoreCard);

// Game Control
const CONFIG = {
  numPlayers: 0,
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

function numberOfPlayers() {
  for (let i of playerSelection) {
    if (i.checked) {
      CONFIG.numPlayers = Number(i.value);
    }
  }
  CONFIG.players = createPlayers();
  console.log(CONFIG);
}

function displayPlayers() {
  const players = Array.from(playersScoreCard);
  console.log(players);

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
  });
}
