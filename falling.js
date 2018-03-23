class Falling {
  constructor(x, y, color, width, height, context, avatar, canvas) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 1;
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
      const avatarRight = this.avatar.withFallingsRight;
      const avatarLeft = this.avatar.withFallingsLeft;
      const avatarBottom = this.canvas.height;
      const avatarTop = this.canvas.height - this.avatar.withFallingsHeight;
      const fallingRight = this.x + (this.width);
      const fallingLeft = this.x;
      const fallingBottom = this.y + (this.height);
      const fallingTop = this.y;
      if ((fallingBottom < avatarTop) ||
          (fallingRight < avatarLeft) ||
          (fallingLeft > avatarRight) ||
          (fallingBottom > avatarTop)) {
          } else {
            this.collided = true;
          this.avatar.withFallingsHeight += this.height;

      }
    }

    updateCollided() {
      this.speedY = 0;
      this.speedX = this.avatar.speedX;
      this.x += this.speedX;
      this.hitSides();
      this.avatar.withFallingsRight = this.x + this.width;
      this.avatar.withFallingsLeft = this.x;
    }

    update() {
      if (this.collided === true) {
        this.updateCollided();
      } else {
         this.didCollide();
        this.y += this.speedY;
      }
    }

    hitSides(){
      const rightSide = this.canvas.width - this.width;
      const leftSide = 0;
      if (this.x > rightSide){
        this.x = rightSide;
      } else if (this.x < leftSide){
        this.x = leftSide;
      }
    }
}

export default Falling;
