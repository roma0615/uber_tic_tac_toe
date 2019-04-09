class X extends Mark {
  constructor(x, y, w, h, sWidth) {
    super(x, y, w, h, sWidth);
  }

  drawMark(isBig) {
    if (isBig) {
      push();
      translate(this.x, this.y);
      fill(255, 0, 0, 75);
      noStroke();
      rect(0, 0, this.w, this.h);
      pop();
    } else {
      push();
      translate(this.x, this.y);
      stroke(255, 0, 0);
      strokeWeight(this.sWidth);
      line(this.w/5, this.h/5, this.w/5*4, this.h/5*4);
      line(this.w/5, this.h/5*4, this.w/5*4, this.h/5);
      pop();
    }
  }
}