class O extends Mark {
  constructor(x, y, w, h, sWidth) {
    super(x, y, w, h, sWidth);
  }

  drawMark(makeTransparent) {
    push();
    translate(this.x, this.y);
    stroke(0, 0, 255, (makeTransparent ? 100 : 255));
    strokeWeight(this.sWidth);
    noFill();
    ellipse(this.w/2, this.h/2, this.w/12*9, this.h/12*9);
    pop();
  }
}