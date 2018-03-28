import Avatar from './avatar';
import Falling from './falling';
import Button from './button';

class Animation {
  constructor(context, canvas) {
    this.context = context;
    this.canvas = canvas;
    this.fallings = [];
    this.counter = 0;
    this.alive = true;
    this.levelScreen = false;
    this.targetCounter = 100;
    this.pizzaCounter = 0;
    this.pizzaTarget = 100;
    this.pillowCounter = 0;
    this.pillowTarget = 100;
    this.level = 1;
    this.fallingSpeed = 1.5;
    this.gravitySpeed = 0.015;
    this.pointFallings = 0;
    this.pizza = 3;
    this.score = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.avatar = 0;
    this.update = this.update.bind(this);
    this.drawScore = this.drawScore.bind(this);
    this.updateFallings = this.updateFallings.bind(this);
    this.replay = this.replay.bind(this);
    this.welcome = this.welcome.bind(this);
    this.start = this.start.bind(this);
    this.initialize = this.initialize.bind(this);
    this.directions = this.directions.bind(this);
  }

  gameOver() {
    if (this.pizza <= 0 || this.avatar.catchSurfaceTop <= 0) {
      this.alive = false;
    }
  }

  welcome() {
    const directions = new Image();
    directions.src = './images/inbox.png';
    directions.onload = () => {
      this.context.drawImage(directions, 0, 0);
    };
    const directionsButton = new Button(0, 32, 0, 32);
    const game = new Image();
    game.src = './images/drugs.png';
    game.onload = () => {
      this.context.drawImage(game, 0, 32);
    };
    const gameButton = new Button(0, 32, 32, 64);
    document.addEventListener(
      'click',
      this.mouseClicked(directionsButton, this.directions)
    );
    document.addEventListener(
      'click',
      this.mouseClicked(gameButton, this.initialize)
    );
  }

  directions() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const game = new Image();
    game.src = './images/drugs.png';
    game.onload = () => {
      this.context.drawImage(game, 0, 0);
    };
    const gameButton = new Button(0, 32, 0, 32);
    document.addEventListener(
      'click',
      this.mouseClicked(gameButton, this.initialize)
    );
  }

  initialize() {
    this.avatar = new Avatar(
      this.canvas.width / 2 - 108,
      this.canvas.height - 216,
      './images/avatar.png',
      this.context,
      this.canvas
    );
    this.start();
  }

  start() {
    requestAnimationFrame(this.update);
  }

  levelUp() {
    this.score += this.pointFallings;
    this.level += 1;
    this.levelScreen = true;
    this.pointFallings = 0;
    this.fallings = [];
    this.gravitySpeed += 0.015;
    this.fallingSpeed += 0.5;
  }

  drawScore() {
    this.context.font = '16px Arial';
    this.context.fillStyle = '#0095DD';
    this.context.fillText('Score: ' + this.score, 8, 20);
    if (this.levelScreen) {
      this.context.fillText('Level: ' + this.level, 8, 40);
      const continu = new Image();
      continu.src = './images/dog.png';
      continu.onload = () => {
        this.context.drawImage(continu, 8, 60);
      };
      const continueButton = new Button(8, 40, 60, 92);
      // this.levelScreen = false;
      document.addEventListener(
        'click',
        this.mouseClicked(continueButton, this.start)
      );
    } else if (!this.alive) {
      this.context.fillText('Game Over!', 8, 40);
      const gameOver = new Image();
      gameOver.src = './images/dog.png';
      gameOver.onload = () => {
        this.context.drawImage(gameOver, 8, 60);
      };
      const restart = new Button(8, 40, 60, 92);
      document.addEventListener(
        'click',
        this.mouseClicked(restart, this.replay)
      );
    }
  }

  mouseClicked(button, action) {
    return e => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
      if (button.checkClicked(this.mouseX, this.mouseY)) {
        this.levelScreen = false;
        action();
      }
    };
  }

  replay() {
    this.alive = true;
    this.level = 1;
    this.fallingSpeed = 1.5;
    this.gravitySpeed = 0.015;
    this.pointFallings = 0;
    this.pizza = 3;
    this.score = 0;
    this.fallings = [];
    debugger;
    this.start();
  }

  drawPizza() {
    this.context.font = '16px Arial';
    this.context.fillStyle = '#0095DD';
    if (this.alive) {
      this.context.fillText('Pizza Remaining: ' + this.pizza, 8, 40);
    }
  }
  // keep this separate from drawscore so can easiliy implement pizza meter later

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
        new Falling(
          x,
          0,
          img,
          'good',
          this.fallingSpeed,
          this.gravitySpeed,
          this.context,
          this.avatar,
          this.canvas,
          this
        )
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
        new Falling(
          x,
          0,
          img,
          'pizza',
          this.fallingSpeed,
          this.gravitySpeed,
          this.context,
          this.avatar,
          this.canvas,
          this
        )
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
        new Falling(
          x,
          0,
          img,
          'pillow',
          this.fallingSpeed,
          this.gravitySpeed,
          this.context,
          this.avatar,
          this.canvas,
          this
        )
      );
      this.pillowTarget = this.createRandom(200, 400);
    }
  }

  updateFallings() {
    if (this.fallings.length) {
      for (let i = 0; i < this.fallings.length; i += 1) {
        this.fallings[i].draw();
        this.fallings[i].update();
      }
    }
  }

  update() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.gameOver();
    this.drawScore();
    if (this.alive && !this.levelScreen) {
      this.drawPizza();
      this.avatar.draw();
      this.avatar.update();
      this.createGoodFalling();
      this.createPizzaFalling();
      this.createPillowFalling();
      this.updateFallings();

      this.start();
    }
  }
}

// for gameplay may be better to generate at set intervals rather than randomly
// if so change createFalling, if this.counter % (target interval) is zero,
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
