class Falling {
  constructor(x, y, color, width, height, context, avatar, canvas) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 1.5;
    this.speedX = 0;
    this.color = color;
    this.context = context;
    this.avatar = avatar;
    this.canvas = canvas;
    this.collided = false;
    this.update = this.update.bind(this);
    this.updateCollided = this.updateCollided.bind(this);
  }

  draw() {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
  }

  didCollide() {
    const avatarRight = this.avatar.catchSurfaceRight;
    const avatarLeft = this.avatar.catchSurfaceLeft;
    const avatarTop = this.avatar.catchSurfaceTop;
    const fallingRight = this.x + this.width;
    const fallingLeft = this.x;
    const fallingBottom = this.y + this.height;
    if (
      fallingBottom < avatarTop ||
      fallingRight < avatarLeft ||
      fallingLeft > avatarRight ||
      fallingBottom > avatarTop + 2
    ) {
    } else {
      this.collided = true;
      this.avatar.catchSurfaceTop -= this.height;
    }
  }

  updateCollided() {
    this.speedY = 0;
    this.speedX = this.avatar.speedX;
    this.x += this.speedX;
    this.hitSides();
    this.avatar.catchSurfaceRight = this.x + this.width;
    this.avatar.catchSurfaceLeft = this.x;
  }

  update() {
    if (this.collided === true) {
      this.updateCollided();
    } else {
      this.didCollide();
      this.y += this.speedY;
    }
  }

  hitSides() {
    const rightSide = this.canvas.width - 166 - this.width;
    const leftSide = 20;
    if (this.x > rightSide) {
      this.x = rightSide;
    } else if (this.x < leftSide) {
      this.x = leftSide;
    }
  }
}

export default Falling;
