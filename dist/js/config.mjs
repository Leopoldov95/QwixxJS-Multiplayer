const config = {
  isOneLocked: false,
  isTwoLocked: false,
  isGameOver: false,
  isPlayerTurnOver: false,
  selectedDiceTotal: 0,
  numPlayers: 0,
  currentPlayer: 0,
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
    this.players[0].playerOnClick();
  },
};

export default config;
