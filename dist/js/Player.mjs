class Player {
  constructor(player) {
    this.player = player;
    this.isTurn = false;

    this.score = 0;
    this.redScore = 0;
    this.calculatedRedScore = 0;
    this.yellowScore = 0;
    this.calculatedYellowScore = 0;
    this.greenScore = 0;
    this.calculatedGreenScore = 0;
    this.blueScore = 0;
    this.calculatedBlueScore = 0;
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
    document.querySelector(".score-result").textContent = this.score;
  }
  // handle score box click
  scoreBoxClick(e, rowColor, scoreColor) {
    let targetNum = 0;

    if (e.target.className === "score-box" && e.target.textContent !== "X") {
      targetNum = Number(e.target.textContent);

      this.updateColorScore(scoreColor);
      e.target.textContent = "X";
      this.updateTotalScore();
    }
    rowColor.splice(rowColor.indexOf(targetNum), 1, "X");
  }

  updateColorScore(scoreColor) {
    if (scoreColor === "red") {
      this.redScore++;
      this.calculatedRedScore = this.calcScore(this.redScore);
      document.querySelector(
        ".score-total.red"
      ).textContent = this.calculatedRedScore;
    } else if (scoreColor === "yellow") {
      this.yellowScore++;
      this.calculatedYellowScore = this.calcScore(this.yellowScore);
      document.querySelector(
        ".score-total.yellow"
      ).textContent = this.calculatedYellowScore;
    } else if (scoreColor === "green") {
      this.greenScore++;
      this.calculatedGreenScore = this.calcScore(this.greenScore);
      document.querySelector(
        ".score-total.green"
      ).textContent = this.calculatedGreenScore;
    } else {
      this.blueScore++;
      this.calculatedBlueScore = this.calcScore(this.blueScore);
      document.querySelector(
        ".score-total.blue"
      ).textContent = this.calculatedBlueScore;
    }
  }

  //update total player Score
  updateTotalScore() {
    this.score =
      this.calculatedRedScore +
      this.calculatedYellowScore +
      this.calculatedGreenScore +
      this.calculatedBlueScore -
      this.penaltyScore;
    this.displayCurrentScore();
  }

  // handle player onClick player selection
  playerOnClick() {
    document.querySelector(
      ".player-title"
    ).textContent = `Player ${this.player}`;
    document.querySelector(".score-result").textContent = this.score;
    document.querySelector(
      ".score-total.red"
    ).textContent = this.calculatedRedScore;
    document.querySelector(
      ".score-total.yellow"
    ).textContent = this.calculatedYellowScore;
    document.querySelector(
      ".score-total.green"
    ).textContent = this.calculatedGreenScore;
    document.querySelector(
      ".score-total.blue"
    ).textContent = this.calculatedBlueScore;
    // want to call these ONLY when player is selected
    this.generateBoxes(document.querySelector(".append-red"), this.redRow);
    this.generateBoxes(
      document.querySelector(".append-yellow"),
      this.yellowRow
    );
    this.generateBoxes(document.querySelector(".append-green"), this.greenRow);
    this.generateBoxes(document.querySelector(".append-blue"), this.blueRow);
  }

  // calculate the rela score bassed on the points on each color score
  calcScore(score) {
    switch (score) {
      case 0:
        return 0;
      case 1:
        return 1;
      case 2:
        return 3;
      case 3:
        return 6;
      case 4:
        return 10;
      case 5:
        return 15;
      case 6:
        return 21;
      case 7:
        return 28;
      case 8:
        return 36;
      case 9:
        return 45;
      case 10:
        return 55;
      case 11:
        return 66;
      default:
        return 78;
    }
  }
}

export default Player;
