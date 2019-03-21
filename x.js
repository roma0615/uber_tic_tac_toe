class X extends Mark {
  constructor(x, y, w, h, sWidth) {
    super(x, y, w, h, sWidth);
  }

  drawMark(makeTransparent) {
    push();
    translate(this.x, this.y);
    stroke(255, 0, 0, (makeTransparent ? 100 : 255));
    strokeWeight(this.sWidth);
    line(this.w/12, this.h/12, this.w/12*11, this.h/12*11);
    line(this.w/12, this.h/12*11, this.w/12*11, this.h/12);
    pop();
  }
}