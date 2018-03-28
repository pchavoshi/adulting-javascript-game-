class Button {
  constructor(left, right, top, bottom) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  checkClicked(mouseX, mouseY) {
    if (
      mouseX < this.right &&
      mouseX > this.left &&
      mouseY > this.top &&
      mouseY < this.bottom
    ) {
      return true;
    }
  }
}

export default Button;
