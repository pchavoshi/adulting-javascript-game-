class Avatar {
constructor(x, y, color, width, height){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color;
  this.speedX = 0;
  this.rightPressed = false;
  this.leftPressed = false;
  document.addEventListener("keydown", this.keyDownHandler.bind(this));
  document.addEventListener("keyup", this.keyUpHandler.bind(this));
  this.update = this.update.bind(this);
  this.newPos = this.newPos.bind(this);
  }

  keyDownHandler(e){
    if (e.keyCode == 39) {
      this.rightPressed = true;
    } else if (e.keyCode == 37) {
      this.leftPressed = true;
    }
  }

  keyUpHandler(e){
    if (e.keyCode == 39) {
      this.rightPressed = false;
    } else if (e.keyCode == 37) {
      this.leftPressed = false;
    }
  }

  draw(context){
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  }

  update(){
    if (this.rightPressed === true) {
      this.speedX = 1;
    } else if (this.leftPressed === true) {
      this.speedX = -1;
    } else if (this.rightPressed || this.leftPressed === false) {
      this.speedX = 0;
    }
    this.newPos();
  }

  newPos(){
    this.x += this.speedX;
  }
}

export default Avatar;
