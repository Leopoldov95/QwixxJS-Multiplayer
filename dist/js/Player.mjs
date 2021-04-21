import scoreHandler from "./scoreHandler.mjs";

class Player {
  constructor(player, lockBoxFn, config) {
    this.player = player;
    this.lockBoxFn = lockBoxFn;
    this.config = config;
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
    this.redRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "🔒"];
    this.yellowRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, "🔒"];
    this.greenRow = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "🔒"];
    this.blueRow = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, "🔒"];
    this.penalty = ["", "X", "X", ""];
    this.displayCurrentScore();
  }

  // generate the penalty box
  generatePenaltyBox(penaltyEl) {
    let parentEl = Array.from(penaltyEl);
    for (let i = 0; i < parentEl.length; i++) {
      parentEl[i].textContent = this.penalty[i];
    }
  }

  /* createLockBox(lockColor) {
    const li = document.createElement("li");
    li.classList.add("score-box", "lock", lockColor);
    li.innerHTML = '<i class="fas fa-unlock-alt"></i>';
    return li;
  } */
  generateBoxes(rowElement, rowColor) {
    /* rowElement.innerHTML = "";
    for (let item of rowColor) {
      rowElement.appendChild(this.createListItem(item, rowColor, lockColor));
    }*/
    //rowElement.appendChild(this.createLockBox(lockColor));
    let rowArr = Array.from(rowElement);
    for (let i = 0; i < rowArr.length; i++) {
      rowArr[i].textContent = rowColor[i];
    }
  }

  displayCurrentScore() {
    document.querySelector(`.player-${this.player}`).textContent = this.score;
    document.querySelector(".score-result").textContent = this.score;
  }
  // handle score box click
  scoreBoxClick(i, rowColor, scoreColor, playerScore) {
    let targetNum = 0;
    // dice sselection validation
    if (i.textContent !== "X") {
      console.log(i.textContent);
      this.checkLockBox(i, rowColor, scoreColor, playerScore);
      targetNum = Number(i.textContent);

      this.updateColorScore(scoreColor);
      i.textContent = "X";
      this.updateTotalScore();
    }
    rowColor.splice(rowColor.indexOf(targetNum), 1, "X");
  }

  checkLockBox(i, rowColor, scoreColor, playerScore) {
    if (rowColor.indexOf(Number(i.textContent)) === 10 && playerScore >= 5) {
      console.log("lockbox triggered");
      this.updateColorScore(scoreColor);
      this.updateTotalScore();
      document.querySelector(`.score-box-${scoreColor}.lock`).textContent = "X";
      rowColor.splice(11, 1, "X");
      // want to somehow update master row lock tracker here
      this.lockBoxFn(this.config);
    }
  }

  updateColorScore(scoreColor) {
    if (scoreColor === "red") {
      this.redScore++;
      this.calculatedRedScore = scoreHandler.calcScore(this.redScore);
      document.querySelector(
        ".score-total.red"
      ).textContent = this.calculatedRedScore;
    } else if (scoreColor === "yellow") {
      this.yellowScore++;
      this.calculatedYellowScore = scoreHandler.calcScore(this.yellowScore);
      document.querySelector(
        ".score-total.yellow"
      ).textContent = this.calculatedYellowScore;
    } else if (scoreColor === "green") {
      this.greenScore++;
      this.calculatedGreenScore = scoreHandler.calcScore(this.greenScore);
      document.querySelector(
        ".score-total.green"
      ).textContent = this.calculatedGreenScore;
    } else {
      this.blueScore++;
      this.calculatedBlueScore = scoreHandler.calcScore(this.blueScore);
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
    this.generateBoxes(
      document.querySelectorAll(".score-box-red"),
      this.redRow
    );
    this.generateBoxes(
      document.querySelectorAll(".score-box-yellow"),
      this.yellowRow
    );
    this.generateBoxes(
      document.querySelectorAll(".score-box-green"),
      this.greenRow
    );
    this.generateBoxes(
      document.querySelectorAll(".score-box-blue"),
      this.blueRow
    );
    this.generatePenaltyBox(document.querySelectorAll(".penalty-box"));
  }
}

export default Player;
