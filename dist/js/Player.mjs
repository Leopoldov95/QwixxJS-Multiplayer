class Player {
  constructor(player) {
    this.player = player;
    this.isTurn = false;
    this.score = 0;
    this.redRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.yellowRow = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
    this.greenRow = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    this.blueRow = [12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
  }

  createListItem(text) {
    const li = document.createElement("li");
    li.classList.add("score-box");
    li.textContent = text;
    return li;
  }
  generateBoxes(rowElement, rowColor) {
    rowElement.innerHTML = "";
    for (let text of rowColor) {
      rowElement.appendChild(this.createListItem(text));
    }

    //this.element.appendChild(ScoreBox.createLockBox());
  }

  // handle player onClick player selection
  playerOnClick() {
    alert(`you clicked player ${this.player}`);
    console.log(this);
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
