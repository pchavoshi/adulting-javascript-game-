import Avatar from './avatar';
import Falling from './falling';

class Animation {
  constructor(context, canvas){
    this.context = context;
    this.canvas = canvas;
    this.obstacles = [];
    this.counter = 0;
    this.targetCounter = 100;
    this.avatar = new Avatar (300, 390, "red", 10, 10, context, this.canvas);
    this.update = this.update.bind(this);
    this.createObstacle = this.createObstacle.bind(this);
    this.updateObstacles = this.updateObstacles.bind(this);
  }

  start() {
    requestAnimationFrame(this.update);
  }

  createRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createObstacle() {
    this.counter += 1;
    if (this.counter === this.targetCounter){
      this.counter = 0;
      let x = this.createRandom(0, 600);
      this.obstacles.push(new Falling(x, 0, "blue", 10, 10, this.context));
      this.targetCounter = this.createRandom(200, 500);
    }
  }

  updateObstacles() {
    for (let i = 0; i < this.obstacles.length; i += 1) {
      this.obstacles[i].update();
      this.obstacles[i].draw();
    }
  }

  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
     this.avatar.update();
     this.avatar.draw();
     this.createObstacle();
     this.updateObstacles();
     this.start();
  }
// for gameplay may be better to generate at set intervals rather than randomly
// if so change createObstacle, if this.counter % (target interval) is zero,
// then generate
// when i have my icons put them in a constArray and index into them randomly
// to generate different random icons 
}

export default Animation;
