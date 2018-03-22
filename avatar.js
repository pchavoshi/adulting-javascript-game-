class Avatar {
constructor(x, y, color, width, height, context){
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.color = color; 
  }

  draw(context){
  context.fillStyle = this.color;
  context.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Avatar;
