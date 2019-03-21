class Grid {

  constructor(topLeftX, topLeftY, w, h) {
    this.topLeftX = topLeftX;
    this.topLeftY = topLeftY;
    this.w = w;
    this.h = h;
    this.gridFinished = false;
    this.marks = new Array(9); // array of Mark objects
  }

  drawMarks() {
    for (let i = 0; i < this.marks.length; i++) {
      if (this.marks[i] != null) this.marks[i].drawMark((this == bigGrid));
    }
  }

  drawGrid(lineCol, sWeight) {
    stroke(lineCol);
    strokeWeight(sWeight);
    push();
    translate(this.topLeftX, this.topLeftY);
    for (let i = 1; i <= 2; i++) {
      line(this.w/3*i, 0, this.w/3*i, this.h);
      line(0, this.h/3*i, this.w, this.h/3*i);
    }
    this.drawMarks();
    if (this.gridFinished && currentGrid != this) {
      fill(26, 200);
      noStroke();
      rectMode(CORNER);
      rect(0, 0, this.w, this.h);
    }
    pop();
  }


  addMark(boxNum, xOrO, sWidth) {
    let newX = ((boxNum-1) % 3) * this.w/3;
    let newY = int(((boxNum-1) / 3)) * this.h/3;
    let newW = this.w/3;
    let newH = this.h/3;

    if (xOrO == Turn.X_TURN)
      this.marks[boxNum-1] = new X(newX, newY, newW, newH, sWidth);
    else
      this.marks[boxNum-1] = new O(newX, newY, newW, newH, sWidth);

    // we don't want to be able to reclaim boxes if we winn in them again, so test if the grid is not finished
    if (!this.gridFinished) this.checkWin(boxNum, xOrO); // boxnum is 1-9, not 0-8
  }

  checkWin(boxNum, xOrO) {
    let whoWon = 0; // 0 is draw, 1 is x win, 2 is o win, -1 (if nothing) is continue play
    boxNum--;
    // vertical win?
    this.gridFinished = true;
    if (this.marks[boxNum%3] instanceof X && this.marks[boxNum%3+3] instanceof X && this.marks[boxNum%3+6] instanceof X) {
      whoWon = 1;
    } else if (this.marks[boxNum%3] instanceof O && this.marks[boxNum%3+3] instanceof O && this.marks[boxNum%3+6] instanceof O) {
      whoWon = 2;
    } else if (this.marks[3*int(boxNum/3)] instanceof X && this.marks[3*int(boxNum/3)+1] instanceof X && this.marks[3*int(boxNum/3)+2] instanceof X) { // horizontal win?
      whoWon = 1;
    } else if (this.marks[3*int(boxNum/3)] instanceof O && this.marks[3*int(boxNum/3)+1] instanceof O && this.marks[3*int(boxNum/3)+2] instanceof O) {
      whoWon = 2;
    } else if (this.marks[0] instanceof X && this.marks[4] instanceof X && this.marks[8] instanceof X) { // diagonal?
      whoWon = 1;
    } else if (this.marks[0] instanceof O && this.marks[4] instanceof O && this.marks[8] instanceof O) {
      whoWon = 2;
    }else if (this.marks[2] instanceof X && this.marks[4] instanceof X && this.marks[6] instanceof X) { // other diagonal? (heh)
      whoWon = 1;
    } else if (this.marks[2] instanceof O && this.marks[4] instanceof O && this.marks[6] instanceof O) {
      whoWon = 2;
    } else {
      this.gridFinished = false;
    }
    
    for (let i = 0; i < this.marks.length; i++) { // check if the board is not full
      if (this.marks[i] == null && whoWon == 0) {
        whoWon = -1;
        break;
      }
    }
    
    if (this == bigGrid) {
      if (whoWon == 0) {
        this.gridFinished = true;
        winMsg = drawMsg;
      } else if (whoWon == 1) {
        winMsg = xWins;
      } else if (whoWon == 2) {
        winMsg = oWins;
      }
    } else {
      if (whoWon == 0) {
        this.gridFinished = true;
      } else if (whoWon == 1) {
        bigGrid.addMark(int(this.topLeftX/this.w + 3*(this.topLeftY/this.h))+1, Turn.X_TURN, 16); // x
        
      } else if (whoWon == 2) {
        bigGrid.addMark(int(this.topLeftX/this.w + 3*(this.topLeftY/this.h))+1, Turn.O_TURN, 16); // o
      }
    }
  }

  hovering() {
    return mouseOver(this.topLeftX, this.topLeftX+this.w, this.topLeftY, this.topLeftY+this.h);
  }

  clickedWithin() {
    let boxNum = -1;
    if (mouseIsPressed) {
      if (mouseOver(this.topLeftX, this.topLeftX+this.w/3, this.topLeftY, this.topLeftY+this.h/3)) boxNum = 1;
      else if (mouseOver(this.topLeftX+this.w/3, this.topLeftX+this.w/3*2, this.topLeftY, this.topLeftY+this.h/3)) boxNum = 2;
      else if (mouseOver(this.topLeftX+this.w/3*2, this.topLeftX+this.w, this.topLeftY, this.topLeftY+this.h/3)) boxNum = 3;
      else if (mouseOver(this.topLeftX, this.topLeftX+this.w/3, this.topLeftY+this.h/3, this.topLeftY+this.h/3*2)) boxNum = 4;
      else if (mouseOver(this.topLeftX+this.w/3, this.topLeftX+this.w/3*2, this.topLeftY+this.h/3, this.topLeftY+this.h/3*2)) boxNum = 5;
      else if (mouseOver(this.topLeftX+this.w/3*2, this.topLeftX+this.w, this.topLeftY+this.h/3, this.topLeftY+this.h/3*2)) boxNum = 6;
      else if (mouseOver(this.topLeftX, this.topLeftX+this.w/3, this.topLeftY+this.h/3*2, this.topLeftY+this.h)) boxNum = 7;
      else if (mouseOver(this.topLeftX+this.w/3, this.topLeftX+this.w/3*2, this.topLeftY+this.h/3*2, this.topLeftY+this.h)) boxNum = 8;
      else if (mouseOver(this.topLeftX+this.w/3*2, this.topLeftX+this.w, this.topLeftY+this.h/3*2, this.topLeftY+this.h)) boxNum = 9;

      mouseIsPressed = false;
    }
    return boxNum;
  }

  active() {
    return currentGrid == this;
  }
  
  gridFull() {
    let full = true;
    for (let i = 0; i < this.marks.length; i++) { // check if the board is not full
      if (this.marks[i] == null) {
        full = false;
        break;
      }
    }
    return full;
  }
}