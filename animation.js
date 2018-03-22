import Avatar from './avatar';

class Animation {
  constructor(context){
    this.context = context;
    this.avatar = new Avatar (300, 390, "red", 10, 10);
    this.update = this.update.bind(this);
  }

  start() {
    setInterval(this.update, 20);
  }

  draw() {
    this.avatar.draw(this.context);
  }

  update() {
    this.context.clearRect(0, 0, 600, 400);
     this.avatar.update();
     this.draw();
  }

}

export default Animation;
