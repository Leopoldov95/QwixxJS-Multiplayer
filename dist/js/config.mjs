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
  warning: document.querySelector(".warning-message"),
  help: document.querySelector(".help-message"),
  displayWarning(message) {
    setTimeout(() => {
      this.warning.style = "display:none";
      this.help.style = "display:inline-block";
    }, 1500);
    this.warning.textContent = message;
    this.warning.style = "display:inline-block";
    this.help.style = "display:none";
  },
  displayHelpMessage(message) {
    this.help.textContent = "";
    this.warning.style = "display:none";
    this.help.style = "display:inline-block";
    this.help.textContent = message;
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
  removeDiceClass() {
    for (let die of document.querySelectorAll(".die")) {
      if (die.className.includes("selected")) {
        die.classList.remove("selected");
      }
    }
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

      return total;
    }
  },
  updateLockCount() {
    if (!this.isOneLocked) {
      this.isOneLocked = true;
    } else {
      this.isTwoLocked = true;
      this.isGameOver = true;
      this.checkGameOver();
    }
  },
  // may want to refator this later
  playerEndTurn(scoreCard, displayPlayer) {
    // keep in mind that player cannot end turn unless they pick a score or take a penalty
    if (this.currentMainPlayer === this.numPlayers - 1) {
      if (this.players[this.currentMainPlayer].isTurnOver) {
        this.players[0].playerOnClick(true);
        this.currentPlayer = 0;
        this.currentMainPlayer = 0;

        scoreCard[this.numPlayers - 1].classList.remove("activePlayer");
        scoreCard[this.currentMainPlayer].classList.add("activePlayer");
        console.log(
          `the current player is player ${this.currentMainPlayer + 1}`
        );
      } else if (!this.checkLegalMove()) {
        this.displayWarning("only the main player can end their turn");
      } else {
        this.displayWarning("you must make a valid move first");
      }
    } else {
      if (this.players[this.currentMainPlayer].isTurnOver) {
        this.currentMainPlayer++;
        this.currentPlayer = this.currentMainPlayer;
        this.players[this.currentMainPlayer].playerOnClick(true);
        scoreCard[this.currentMainPlayer - 1].classList.remove("activePlayer");
        scoreCard[this.currentMainPlayer].classList.add("activePlayer");
        console.log(
          `the current player is player ${this.currentMainPlayer + 1}`
        );
      } else if (!this.checkLegalMove()) {
        this.displayWarning("only the main player can end their turn");
      } else {
        this.displayWarning("you must make a valid move first");
      }
    }
    displayPlayer.textContent = this.currentMainPlayer + 1;
  },
  checkLegalMove() {
    return this.currentMainPlayer === this.currentPlayer;
  },
  displayWinner() {
    let winner;
    let highScore = -20;
    for (let player of this.players) {
      if (player.score > highScore) {
        highScore = player.score;
        winner = player.player;
      }
    }
    return winner;
  },
  checkGameOver() {
    if (
      this.players[this.currentMainPlayer].penaltyScore >= 20 ||
      (this.isOneLocked && this.isTwoLocked)
    ) {
      document.querySelector("#score-card").innerHTML = `
      <div class='winner-display'>
        <h1>GAME OVER!!!!</h1>
        <h3>The Winner is Player ${this.displayWinner()} </h3>
      </div>
     `;
    }
  },
};

export default config;
