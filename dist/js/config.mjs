const config = {
  isOneLocked: false,
  isTwoLocked: false,
  isGameOver: false,
  isPlayerTurnOver: false,
  selectedDiceTotal: 0,
  numPlayers: 0,
  // need to fix issue with displaying a player versus handling players turn
  currentPlayer: 0,
  currentMainPlayer: 0,
  players: [],

  gameOver() {
    if (this.isGameOver) alert("the game is over");
  },

  displayPlayers(scoreCard) {
    const players = Array.from(scoreCard);
    for (let i = 0; i < this.numPlayers; i++) {
      players[i].style = "display:flex";
    }
  },
  numberOfPlayers(players, playerCreate) {
    for (let i of players) {
      if (i.checked) {
        this.numPlayers = Number(i.value);
      }
    }
    this.players = playerCreate();
    this.players[0].playerOnClick(true);
  },
  checkSelectedDie() {
    let selected = 0;
    for (let die of document.querySelectorAll(".die")) {
      if (die.className.includes("selected")) {
        selected += 1;
      }
    }
    return selected;
  },
  checkValidDiceSelected() {
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
      console.log(total);
      return total;
    }
  },
  updateLockCount() {
    if (!this.isOneLocked) {
      this.isOneLocked = true;
    } else {
      this.isTwoLocked = true;
      this.isGameOver = true;
      this.gameOver();
    }
  },
  playerEndTurn(scoreCard, displayPlayer) {
    // keep in mind that player cannot end turn unless they pick a score or take a penalty
    if (this.currentMainPlayer === this.numPlayers - 1) {
      this.players[0].playerOnClick(true);
      //this.this.currentMainPlayer = 0;
      this.currentMainPlayer = 0;

      scoreCard[this.numPlayers - 1].classList.remove("activePlayer");
      scoreCard[this.currentMainPlayer].classList.add("activePlayer");
      console.log(`the current player is player ${this.currentMainPlayer + 1}`);
    } else {
      //this.this.currentMainPlayer++;
      this.currentMainPlayer++;
      this.players[this.currentMainPlayer].playerOnClick(true);
      scoreCard[this.currentMainPlayer - 1].classList.remove("activePlayer");
      scoreCard[this.currentMainPlayer].classList.add("activePlayer");
      console.log(`the current player is player ${this.currentMainPlayer + 1}`);
    }
    displayPlayer.textContent = this.currentMainPlayer + 1;
  },
};

export default config;
