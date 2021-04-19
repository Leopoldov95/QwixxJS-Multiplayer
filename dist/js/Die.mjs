class Die {
  constructor() {
    this.dieArr = new Array(6).fill(undefined).map((x) => this.genRandNum());
    this.dieOne = this.dieArr[0];
    this.dieTwo = this.dieArr[1];
    this.dieRed = this.dieArr[2];
    this.dieYellow = this.dieArr[3];
    this.dieGreen = this.dieArr[4];
    this.dieBlue = this.dieArr[5];

    this.faceName = ["one", "two", "three", "four", "five", "six"];
    this.diceContainer = document.querySelector(".dice-row");
    this.diceContainerGen = document.querySelector(".dice-row div");
    this.titleDice = document.querySelector(".title-dice-container");
    this.validScores = document.querySelector(".scores");
  }

  genRandNum() {
    return Math.floor(Math.random() * 6);
  }
  genTitleDice() {
    this.titleDice.innerHTML = `
<i class="die fas fa-dice-${this.faceName[this.dieOne]}"></i>
<i class="die fas fa-dice-${this.faceName[this.dieTwo]}"></i>

`;
  }
  genDice() {
    //div.classList.add('dice-row');
    this.diceContainerGen.innerHTML = `
            <i value=${this.dieOne + 1} class="die die-one fas fa-dice-${
      this.faceName[this.dieOne]
    }"></i>
            <i value=${this.dieTwo + 1} class="die die-two fas fa-dice-${
      this.faceName[this.dieTwo]
    }"></i>
            <i value=${this.dieRed + 1} class="die die-red fas fa-dice-${
      this.faceName[this.dieRed]
    }"></i>
            <i value=${this.dieYellow + 1} class="die die-yellow fas fa-dice-${
      this.faceName[this.dieYellow]
    }"></i>
            <i value=${this.dieGreen + 1} class="die die-green fas fa-dice-${
      this.faceName[this.dieGreen]
    }"></i>
            <i value=${this.dieBlue + 1} class="die die-blue fas fa-dice-${
      this.faceName[this.dieBlue]
    }"></i>
    `;
  }

  roll() {
    for (let die of document.querySelectorAll(".die")) {
      setTimeout(() => {
        die.classList.remove("die-active");
      }, 500);

      die.classList.add("die-active");
    }
  }
}

export default Die;
