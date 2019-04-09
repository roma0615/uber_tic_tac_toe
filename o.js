class O extends Mark {
  constructor(x, y, w, h, sWidth) {
    super(x, y, w, h, sWidth);
  }

  drawMark(isBig) {
    if (isBig) {
      push();
      translate(this.x, this.y);
      fill(0, 0, 255, 75);
      noStroke();
      rect(0, 0, this.w, this.h);
      pop();
    } else {
      push();
      translate(this.x, this.y);
      stroke(0, 0, 255);
      strokeWeight(this.sWidth);
      noFill();
      ellipse(this.w/2, this.h/2, this.w/3*2, this.h/3*2);
      pop();
    }
  }
}