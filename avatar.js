class Avatar {
  constructor(x, y, img, context, canvas) {
    // this.width = width;
    // this.height = height;
    this.x = x;
    this.y = y;
    this.context = context;
    this.image = new Image();
    this.image.src = img;
    this.image.onload = this.draw;
    // this.color = img;
    this.canvas = canvas;
    // this.withFallingsHeight = height;
    this.withFallingsLeft = this.x;
    // this.withFallingsRight = this.x + this.width;
    this.speedX = 0;
    this.rightPressed = false;
    this.leftPressed = false;
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.addEventListener('keyup', this.keyUpHandler.bind(this));
    this.update = this.update.bind(this);
    this.newPos = this.newPos.bind(this);
    this.hitSides = this.hitSides.bind(this);
    // this.draw = this.draw.bind(this);
  }

  keyDownHandler(e) {
    if (e.keyCode == 39) {
      this.rightPressed = true;
    } else if (e.keyCode == 37) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e) {
    if (e.keyCode == 39) {
      this.rightPressed = false;
    } else if (e.keyCode == 37) {
      this.leftPressed = false;
    }
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y);
  }

  // draw() {
  //   this.context.fillStyle = this.color;
  //   this.context.fillRect(this.x, this.y, this.width, this.height);
  // }

  updateCatchSurface() {
    this.withFallingsLeft += this.speedX;
    this.withFallingsRight += this.speedX;
  }

  update() {
    if (this.rightPressed === true) {
      this.speedX = 2;
    } else if (this.leftPressed === true) {
      this.speedX = -2;
    } else if (this.rightPressed || this.leftPressed === false) {
      this.speedX = 0;
    }
    this.newPos();
  }

  newPos() {
    this.x += this.speedX;
    this.updateCatchSurface();
    this.hitSides();
  }

  hitSides() {
    const rightSide = this.canvas.width - 216;
    const leftSide = 0;
    if (this.x > rightSide) {
      this.x = rightSide;
      this.updateCatchSurface();
    } else if (this.x < leftSide) {
      this.x = leftSide;
      this.updateCatchSurface();
    }
  }
}

export default Avatar;
