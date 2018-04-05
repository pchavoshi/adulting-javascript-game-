class Falling {
  constructor(
    x,
    y,
    img,
    type,
    speedY,
    gravitySpeed,
    context,
    avatar,
    canvas,
    animation
  ) {
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    this.gravitySpeed = gravitySpeed;
    this.speedX = 0;
    this.context = context;
    this.avatar = avatar;
    this.canvas = canvas;
    this.animation = animation;
    this.type = type;
    this.image = new Image();
    this.image.src = img;
    this.collided = false;
    this.tabulated = false;
    this.update = this.update.bind(this);
    this.updateCollided = this.updateCollided.bind(this);
    this.draw = this.draw.bind(this);
    this.image.onload = this.draw;
    this.didCollide = this.didCollide.bind(this);
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
      fallingBottom > avatarTop + this.speedY
    ) {
    } else if (this.type === 'good') {
      this.collided = true;
      // this.avatar.catchSurfaceTop -= 32;
      // this.animation.pointFallings += 1;
      this.animation.score += 5;
      if (this.animation.score % 20 === 0) {
        this.animation.levelUp();
      }
    } else if (this.type === 'pizza') {
      // this.tabulated = true;
      this.animation.pizza -= 1;
this.collided = true;
    } else if (this.type === 'pillow') {
      this.avatar.catchSurfaceTop = this.canvas.height - 135;
      this.animation.levelUp();
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
    // if (this.collided === true) {
    //   this.updateCollided();
    // } else if (this.tabulated === true) {
    //   this.speedY += this.gravitySpeed;
    //   this.y += this.speedY;
    // } else {
    //   this.didCollide();
    //   this.speedY += this.gravitySpeed;
    //   this.y += this.speedY;
    // }
    this.didCollide();
    this.speedY += this.gravitySpeed;
    this.y += this.speedY;
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
