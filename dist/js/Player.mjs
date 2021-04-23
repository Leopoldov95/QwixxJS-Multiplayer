import scoreHandler from "./scoreHandler.mjs";
import config from "./config.mjs";

class Player {
  constructor(player, lockBoxFn) {
    this.player = player;
    this.lockBoxFn = lockBoxFn;
    this.colorDiceRemainig = 1;
    this.whiteDiceRemaining = 1;
    this.rollsLeft = 0;
    this.isTurnOver = false;
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
    this.penalty = ["", "", "", ""];
    this.displayCurrentScore();
  }

  // generate the penalty box
  generatePenaltyBox(penaltyEl) {
    let parentEl = Array.from(penaltyEl);
    for (let i = 0; i < parentEl.length; i++) {
      parentEl[i].textContent = this.penalty[i];
    }
  }

  handlePenalty(element, box) {
    this.penalty.splice(element.indexOf(box), 1, "X");
    this.penaltyScore += 5;
    this.generatePenaltyBox(document.querySelectorAll(".penalty-box"));
    this.updateTotalScore();
    document.querySelector(
      ".score-total.penalty"
    ).textContent = this.penaltyScore;
  }

  generateBoxes(rowElement, rowColor) {
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
    if (
      i.textContent !== "X" &&
      Number(i.textContent) === config.checkValidDiceSelected() &&
      rowColor.indexOf(Number(i.textContent)) > rowColor.lastIndexOf("X")
    ) {
      console.log("this did something");
      this.checkLockBox(i, rowColor, scoreColor, playerScore);
      targetNum = Number(i.textContent);

      this.updateColorScore(scoreColor);
      i.textContent = "X";
      this.updateTotalScore();
      rowColor.splice(rowColor.indexOf(targetNum), 1, "X");
    }
  }

  checkLockBox(i, rowColor, scoreColor, playerScore) {
    if (rowColor.indexOf(Number(i.textContent)) === 10 && playerScore >= 5) {
      console.log("lockbox triggered");
      this.updateColorScore(scoreColor);
      this.updateTotalScore();
      document.querySelector(`.score-box-${scoreColor}.lock`).textContent = "X";
      rowColor.splice(11, 1, "X");
      // want to somehow update master row lock tracker here
      config.updateLockCount();
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
  playerOnClick(refillRoll) {
    if (refillRoll) {
      this.rollsLeft = 1;
    }
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
    document.querySelector(
      ".score-total.penalty"
    ).textContent = this.penaltyScore;
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
    // generates the penalty box
    this.generatePenaltyBox(document.querySelectorAll(".penalty-box"));
  }
}

export default Player;

/* 

//so this handles color validation and handles players turn 
checkDieColor(color) {
    let dieOne;
    let dieTwo;
    // run for of loop for every die
    for (let die of document.querySelectorAll(".die")) {
      if (die.classList.contains("selected")) {
        if (!dieOne) {
          dieTwo = die;
        }
        dieOne = die;
      }
    }

    if (
      dieTwo.classList.contains("die-one") &&
      dieOne.classList.contains("die-two")
    ) {
      if (game.dieRemaining === 1) {
        game.dieRemaining--;
        // run score box handler here!!!!
        //game.displayRemainingDices();
        game.isTurnOver = true;

        return true;
      } else {
        return false;
      }
    } else if (
      dieTwo.classList.contains("die-one") ||
      dieTwo.classList.contains("die-two")
    ) {
      if (dieOne.classList.contains(`die-${color}`)) {
        if (game.coloredDieRemaining === 1) {
          if (game.dieRemaining === 1) {
            game.dieRemaining--;
          }
          game.coloredDieRemaining--;
          //game.displayRemainingDices();
          game.isTurnOver = true;

          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      return false;
    }
  },*/
