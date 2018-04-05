/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__animation__ = __webpack_require__(1);


document.addEventListener('DOMContentLoaded', () => {
  const directionsScreen = document.getElementById('directions-screen');
  const directionsButton = document.getElementById('directions-button');
  const welcomeScreen = document.getElementById('welcome-screen');

  directionsScreen.style.display = 'none';

  directionsButton.addEventListener('click', () => {
    directionsScreen.style.display = 'block';
    welcomeScreen.style.display = 'none';
  });

  document.addEventListener('click', () => {
    if (event.target.classList.contains('start-button')) {
      welcomeScreen.style.display = 'none';
      directionsScreen.style.display = 'none';

      const canvasEl = document.getElementById('game-canvas');
      const ctx = canvasEl.getContext('2d');

      canvasEl.width = 885;
      canvasEl.height = 600;

      new __WEBPACK_IMPORTED_MODULE_0__animation__["a" /* default */](ctx, canvasEl).start();
    }
  });
});


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__avatar__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__falling__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__button__ = __webpack_require__(4);




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
    this.pizzaTarget = 60;
    this.pillowCounter = 0;
    this.pillowTarget = 300;
    this.level = 1;
    this.fallingSpeed = 1.5;
    this.gravitySpeed = 0.015;
    this.pointFallings = 0;
    this.pizza = 3;
    this.score = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.pizzaIntervalMax = 800;
    this.pizzaIntervalMin = 200;
    this.avatar = new __WEBPACK_IMPORTED_MODULE_0__avatar__["a" /* default */](
      this.canvas.width / 2 - 108,
      this.canvas.height - 216,
      './images/avatar2.png',
      this.context,
      this.canvas
    );
    this.currentHandleClick = null;
    this.update = this.update.bind(this);
    this.drawScore = this.drawScore.bind(this);
    this.updateFallings = this.updateFallings.bind(this);
    this.replay = this.replay.bind(this);
    this.start = this.start.bind(this);
  }

  gameOver() {
    if (this.pizza <= 0 || this.avatar.catchSurfaceTop <= 0) {
      this.alive = false;
    }
  }

  start() {
    document.removeEventListener('click', this.currentHandleClick);
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
    if (this.pizzaIntervalMax > 100) {
      this.pizzaIntervalMax -= 100;
    } else if (this.pizzaIntervalMin > 50) {
      this.pizzaIntervalMin -= 40;
    }
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
      const continueButton = new __WEBPACK_IMPORTED_MODULE_2__button__["a" /* default */](8, 40, 60, 92);
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
      const restart = new __WEBPACK_IMPORTED_MODULE_2__button__["a" /* default */](8, 40, 60, 92);
      document.addEventListener(
        'click',
        this.mouseClicked(restart, this.replay)
      );
    }
  }

  mouseClicked(button, action) {
    const handleClick = e => {
      this.mouseX = e.pageX;
      this.mouseY = e.pageY;
      if (button.checkClicked(this.mouseX, this.mouseY)) {
        this.levelScreen = false;
        action();
      }
    };
    this.currentHandleClick = handleClick;
    return handleClick;
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
        new __WEBPACK_IMPORTED_MODULE_1__falling__["a" /* default */](
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
        new __WEBPACK_IMPORTED_MODULE_1__falling__["a" /* default */](
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
      this.pizzaTarget = this.createRandom(
        this.pizzaIntervalMin,
        this.pizzaIntervalMax
      );
    }
  }

  createPillowFalling() {
    this.pillowCounter += 1;
    if (this.pillowCounter === this.pillowTarget) {
      this.pillowCounter = 0;
      let x = this.createRandom(18, this.canvas.width - 170);
      const img = './images/pillow.png';
      this.fallings.push(
        new __WEBPACK_IMPORTED_MODULE_1__falling__["a" /* default */](
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
      this.pillowTarget = this.createRandom(800, 1200);
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
  2: './images/dog-big.png',
  3: './images/dog-bigger.png',
  4: './images/dog.png',
  5: './images/dog-big.png',
  6: './images/dog-bigger.png',
  7: './images/inbox.png',
  8: './images/tax.png'
};

/* harmony default export */ __webpack_exports__["a"] = (Animation);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Avatar {
  constructor(x, y, img, context, canvas) {
    this.x = x;
    this.y = y;
    this.context = context;
    this.image = new Image();
    this.image.src = img;
    this.canvas = canvas;
    this.catchSurfaceTop = this.canvas.height - 135;
    this.catchSurfaceLeft = this.x + 15;
    this.catchSurfaceRight = this.x + 50;
    this.speedX = 0;
    this.rightPressed = false;
    this.leftPressed = false;
    document.addEventListener('keydown', this.keyDownHandler.bind(this));
    document.addEventListener('keyup', this.keyUpHandler.bind(this));
    this.update = this.update.bind(this);
    this.newPos = this.newPos.bind(this);
    this.hitSides = this.hitSides.bind(this);
    this.draw = this.draw.bind(this);
    this.image.onload = this.draw;
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

  updateCatchSurface() {
    this.catchSurfaceLeft += this.speedX;
    this.catchSurfaceRight += this.speedX;
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

/* harmony default export */ __webpack_exports__["a"] = (Avatar);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Falling {
  constructor(
    x,
    y,
    img,
    type,
    speedY,
    gravitySpeed,
    context,
    avatar,
    canvas,
    animation
  ) {
    this.x = x;
    this.y = y;
    this.speedY = speedY;
    this.gravitySpeed = gravitySpeed;
    this.speedX = 0;
    this.context = context;
    this.avatar = avatar;
    this.canvas = canvas;
    this.animation = animation;
    this.type = type;
    this.image = new Image();
    this.image.src = img;
    this.collided = false;
    this.tabulated = false;
    this.update = this.update.bind(this);
    this.updateCollided = this.updateCollided.bind(this);
    this.draw = this.draw.bind(this);
    this.image.onload = this.draw;
    this.didCollide = this.didCollide.bind(this);
  }

  draw() {
    this.context.drawImage(this.image, this.x, this.y);
  }

  didCollide() {
    const avatarRight = this.avatar.catchSurfaceRight;
    const avatarLeft = this.avatar.catchSurfaceLeft;
    const avatarTop = this.avatar.catchSurfaceTop;
    const fallingRight = this.x + 32;
    const fallingLeft = this.x;
    const fallingBottom = this.y + 32;
    if (
      fallingBottom < avatarTop ||
      fallingRight < avatarLeft ||
      fallingLeft > avatarRight ||
      fallingBottom > avatarTop + this.speedY
    ) {
    } else if (this.type === 'good') {
      this.collided = true;
      this.avatar.catchSurfaceTop -= 32;
      this.animation.pointFallings += 1;
    } else if (this.type === 'pizza') {
      this.tabulated = true;
      this.animation.pizza -= 1;
    } else if (this.type === 'pillow') {
      this.avatar.catchSurfaceTop = this.canvas.height - 135;
      this.animation.levelUp();
    }
  }

  updateCollided() {
    this.speedY = 0;
    this.speedX = this.avatar.speedX;
    this.x += this.speedX;
    this.hitSides();
    this.avatar.catchSurfaceRight = this.x + 32;
    this.avatar.catchSurfaceLeft = this.x;
  }

  update() {
    if (this.collided === true) {
      this.updateCollided();
    } else if (this.tabulated === true) {
      this.speedY += this.gravitySpeed;
      this.y += this.speedY;
    } else {
      this.didCollide();
      this.speedY += this.gravitySpeed;
      this.y += this.speedY;
    }
  }

  hitSides() {
    const rightSide = this.canvas.width - 166 - 32;
    const leftSide = 10;
    if (this.x > rightSide) {
      this.x = rightSide;
    } else if (this.x < leftSide) {
      this.x = leftSide;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Falling);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Button {
  constructor(left, right, top, bottom) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.bottom = bottom;
  }

  checkClicked(mouseX, mouseY) {
    if (
      mouseX < this.right &&
      mouseX > this.left &&
      mouseY > this.top &&
      mouseY < this.bottom
    ) {
      return true;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Button);


/***/ })
/******/ ]);