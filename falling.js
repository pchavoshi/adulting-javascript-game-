class Falling {
  constructor(x, y, color, width, height, context){ 
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedY = 1;
    this.color = color;
    this.context = context;
    this.draw = this.draw.bind(this);
    }

    draw(){
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(){
      this.y += this.speedY;
    }
}

export default Falling;
