let bigGrid;
let grids = new Array();
let currentGrid;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent("canvas-container");
  
  bigGrid = new Grid(0, 0, width, height);  

  grids = new Array(9);
  for (let i = 0; i < grids.length; i++) {
    grids[i] = new Grid(i%3 * width/3, int(i/3) * height/3, width/3, height/3);
  }
  
  textFont("Verdana");
}


let scene = Scene.GAME;
let turn = Turn.X_TURN;
let placeAnywhere = true;
let winMsg = "";
const xWins = "X WINS!";
const oWins = "O WINS!";
const drawMsg = "DRAW!";

let xCursor = new X(0, 0, 50, 50, 6);
let oCursor = new O(0, 0, 50, 50, 6);

function mouseOver(minX, maxX, minY, maxY) {
  return (mouseX > minX && mouseX < maxX && mouseY > minY && mouseY < maxY);
}

function draw() {
  background(26);
  // draw dem grids
  for (let i = 0; i < grids.length; i++) {
    if (placeAnywhere) { // if its either the first turn or you've been redirected to a grid that is full
      let col = (grids[i].hovering() && !grids[i].gridFinished ? 255 : 100);
      let weight = (grids[i].hovering() && !grids[i].gridFinished ? 4 : 2);
      grids[i].drawGrid(color(col), weight);
    } else {
      let col = (grids[i].active() ? 255 : 100);
      let weight = (grids[i].active() ? 4 : 2);
      grids[i].drawGrid(color(col), weight); ///////////////////////////////////////
    }
  }
  bigGrid.drawGrid(color(255), 5);

  // test for clicks in dem grids
  for (let i = 0; i < grids.length; i++) { // iterate through all grids
    if (grids[i].hovering() && !grids[i].gridFull()) { // if hovering over the grid and it is not full (finished or not)
      if (placeAnywhere) { // if it is the first turn or been redirected to a full board (place anywhere)
        // placeMark(i);
        if (!grids[i].gridFinished) {
          placeMark(i);
        }
      } else { // if it not place anywhere
        if (grids[i].active()) { // if the grid is the one to be played in
          placeMark(i);
        }
      }
    }
  }
  
  if (winMsg != "") {
    if (winMsg == xWins) {
      fill(255, 0, 0);
    } else if (winMsg == oWins) {
      fill(0, 0, 255);
    } else if (winMsg == draw) {
      fill(255);
    }
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(width/20);
    text(winMsg, width/2, height/2);
  } else {
    if (turn == Turn.X_TURN) {
      xCursor.x = mouseX-xCursor.w/2;
      xCursor.y = mouseY-xCursor.h/2;
      xCursor.drawMark(false);
    } else {
      oCursor.x = mouseX-oCursor.w/2;
      oCursor.y = mouseY-oCursor.h/2;
      oCursor.drawMark(false);
    }
  }
}

function placeMark(i) {
  let boxNum = grids[i].clickedWithin(); // check which box has been clicked
  if (boxNum != -1) { // if it has been clicked
    // place either x or o
    if (grids[i].marks[boxNum-1] == null) {
      if (placeAnywhere) placeAnywhere = false;
      grids[i].addMark(boxNum, turn, 8); // the grid itself will figure out the values for the new mark
      
      // if a little grid has been won and a player is sent to that grid, they can place anywhere
      if (grids[boxNum-1].gridFull()) { // if the grid just played in is now full
        placeAnywhere = true;
      } else { // if not full and not finished (playable)
        currentGrid = grids[boxNum-1]; // move the current grid to the grid in whichever box was clicked
      }
      
      if (turn == Turn.X_TURN) turn = Turn.O_TURN;
      else turn = Turn.X_TURN;
    }
  }
}
