import Avatar from './avatar';
import Falling from './falling';

class Animation {
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.fallings = [];
    this.counter = 0;
    this.targetCounter = 100;
    this.pizzaCounter = 0;
    this.pizzaTarget = 100;
    this.pillowCounter = 0;
    this.pillowTarget = 100;
    this.avatar = new Avatar(
      this.canvas.width / 2 - 108,
      this.canvas.height - 216,
      './images/avatar.png',
      this.context,
      this.canvas
    );
    this.update = this.update.bind(this);
  }

  start() {
    requestAnimationFrame(this.update);
  }

  createRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  createGoodFalling() {
    this.counter += 1;
    if (this.counter === this.targetCounter) {
      this.counter = 0;
      let x = this.createRandom(18, this.canvas.width - 170);
      let imgIndex = this.createRandom(1, 8);
      let img = Animation.GOOD_OBJECTS[imgIndex];
      this.fallings.push(
        new Falling(x, 0, img, 'good', this.context, this.avatar, this.canvas)
      );
      this.targetCounter = this.createRandom(200, 400);
    }
  }

  createPizzaFalling() {
    this.pizzaCounter += 1;
    if (this.pizzaCounter === this.pizzaTarget) {
      this.pizzaCounter = 0;
      let x = this.createRandom(18, this.canvas.width - 170);
      const img = './images/pizza.png';
      this.fallings.push(
        new Falling(x, 0, img, 'pizza', this.context, this.avatar, this.canvas)
      );
      this.pizzaTarget = this.createRandom(200, 400);
    }
  }

  createPillowFalling() {
    this.pillowCounter += 1;
    if (this.pillowCounter === this.pillowTarget) {
      this.pillowCounter = 0;
      let x = this.createRandom(18, this.canvas.width - 170);
      const img = './images/pillow.png';
      this.fallings.push(
        new Falling(x, 0, img, 'pillow', this.context, this.avatar, this.canvas)
      );
      this.pillowTarget = this.createRandom(200, 400);
    }
  }

  updateFallings() {
    for (let i = 0; i < this.fallings.length; i += 1) {
      this.fallings[i].update();
      this.fallings[i].draw();
    }
  }

  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.avatar.draw();
    this.avatar.update();
    this.createGoodFalling();
    this.createPizzaFalling();
    this.createPillowFalling();
    this.updateFallings();
    this.start();
  }
}

// for gameplay may be better to generate at set intervals rather than randomly
// if so change createObstacle, if this.counter % (target interval) is zero,
// then generate

Animation.GOOD_OBJECTS = {
  1: './images/dog.png',
  2: './images/drugs.png',
  3: './images/salad.png',
  4: './images/wash.png',
  5: './images/dumbbell.png',
  6: './images/groceries.png',
  7: './images/inbox.png',
  8: './images/tax.png'
};

export default Animation;
