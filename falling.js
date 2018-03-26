class Falling {
  constructor(x, y, img, type, context, avatar, canvas) {
    this.x = x;
    this.y = y;
    this.speedY = 1.5;
    this.speedX = 0;
    this.context = context;
    this.avatar = avatar;
    this.canvas = canvas;
    this.type = type;
    this.image = new Image();
    this.image.src = img;
    this.image.onload = this.draw;
    this.collided = false;
    this.update = this.update.bind(this);
    this.updateCollided = this.updateCollided.bind(this);
    this.draw = this.draw.bind(this);
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y);
  }

  didCollide() {
    const avatarRight = this.avatar.catchSurfaceRight;
    const avatarLeft = this.avatar.catchSurfaceLeft;
    const avatarTop = this.avatar.catchSurfaceTop;
    const fallingRight = this.x + 32;
    const fallingLeft = this.x;
    const fallingBottom = this.y + 32;
    if (
      fallingBottom < avatarTop ||
      fallingRight < avatarLeft ||
      fallingLeft > avatarRight ||
      fallingBottom > avatarTop + 2
    ) {
    } else if (this.type === 'good') {
      this.collided = true;
      this.avatar.catchSurfaceTop -= 32;
    }
  }

  updateCollided() {
    this.speedY = 0;
    this.speedX = this.avatar.speedX;
    this.x += this.speedX;
    this.hitSides();
    this.avatar.catchSurfaceRight = this.x + 32;
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
    const rightSide = this.canvas.width - 166 - 32;
    const leftSide = 10;
    if (this.x > rightSide) {
      this.x = rightSide;
    } else if (this.x < leftSide) {
      this.x = leftSide;
    }
  }
}

export default Falling;
