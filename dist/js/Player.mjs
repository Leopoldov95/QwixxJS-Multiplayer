class Player {
  constructor(player) {
    this.player = player;
    this.isTurn = false;
    this.score = 0;
    this.redScore = 0;
    this.yellowScore = 0;
    this.greenScore = 0;
    this.blueScore = 0;
    this.penaltyScore = 0;
    this.redRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.yellowRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.greenRow = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    this.blueRow = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2];
    this.displayCurrentScore();
  }

  createListItem(text) {
    const li = document.createElement("li");
    li.classList.add("score-box");
    li.textContent = text;
    return li;
  }

  createLockBox() {
    const li = document.createElement("li");
    li.classList.add("score-box", "lock");
    li.innerHTML = '<i class="fas fa-unlock-alt"></i>';
    return li;
  }
  generateBoxes(rowElement, rowColor) {
    rowElement.innerHTML = "";
    for (let text of rowColor) {
      rowElement.appendChild(this.createListItem(text));
    }
    rowElement.appendChild(this.createLockBox());

    /*   */
    //this.element.appendChild(ScoreBox.createLockBox());
  }

  displayCurrentScore() {
    document.querySelector(`.player-${this.player}`).textContent = this.score;
  }
  // handle score box click
  scoreBoxClick(e, rowColor, scoreColor) {
    let targetNum = 0;
    if (e.target.className === "score-box" && e.target.textContent !== "X") {
      targetNum = Number(e.target.textContent);
      scoreColor++;
      scoreColor = scoreColor;
      console.log(scoreColor);
      //this.redScore++;
      console.log(this.redScore);

      e.target.textContent = "X";
      this.updateTotalScore();
    }
    rowColor.splice(rowColor.indexOf(targetNum), 1, "X");
  }

  //update total player Score
  updateTotalScore() {
    this.score =
      this.redScore +
      this.yellowScore +
      this.greenScore +
      this.blueScore -
      this.penaltyScore;
    this.displayCurrentScore();
  }

  // handle player onClick player selection
  playerOnClick() {
    document.querySelector(
      ".player-title"
    ).textContent = `Player ${this.player}`;
    // want to call these ONLY when player is selected
    this.generateBoxes(document.querySelector(".append-red"), this.redRow);
    this.generateBoxes(
      document.querySelector(".append-yellow"),
      this.yellowRow
    );
    this.generateBoxes(document.querySelector(".append-green"), this.greenRow);
    this.generateBoxes(document.querySelector(".append-blue"), this.blueRow);
  }
}

export default Player;
