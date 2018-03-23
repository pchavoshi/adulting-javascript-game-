import Avatar from './avatar';
import Falling from './falling';

class Animation {
  constructor(context){
    this.context = context;
    this.avatar = new Avatar (300, 390, "red", 10, 10, context);
    this.update = this.update.bind(this);
  }

  start() {
    setInterval(this.update, 20);
  }

  update() {
    this.context.clearRect(0, 0, 600, 400);
     this.avatar.update();
     this.avatar.draw();
     this.falling.update();
     this.falling.draw();
  }

}

export default Animation;
