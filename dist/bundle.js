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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./adulting.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./adulting.js":
/*!*********************!*\
  !*** ./adulting.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./animation */ \"./animation.js\");\n\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  const canvasEl = document.getElementById('game-canvas');\n  const ctx = canvasEl.getContext('2d');\n\n  canvasEl.width = 800;\n  canvasEl.height = 600;\n\n  new _animation__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx, canvasEl).start();\n});\n\n//# sourceURL=webpack:///./adulting.js?");

/***/ }),

/***/ "./animation.js":
/*!**********************!*\
  !*** ./animation.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _avatar__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./avatar */ \"./avatar.js\");\n/* harmony import */ var _falling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./falling */ \"./falling.js\");\n\n\n\nclass Animation {\n  constructor(context, canvas) {\n    this.context = context;\n    this.canvas = canvas;\n    this.fallings = [];\n    this.counter = 0;\n    this.targetCounter = 100;\n    this.pizzaCounter = 0;\n    this.pizzaTarget = 100;\n    this.pillowCounter = 0;\n    this.pillowTarget = 100;\n    this.avatar = new _avatar__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.canvas.width / 2 - 108, this.canvas.height - 216, './images/avatar.png', this.context, this.canvas);\n    this.update = this.update.bind(this);\n  }\n\n  start() {\n    requestAnimationFrame(this.update);\n  }\n\n  createRandom(min, max) {\n    return Math.floor(Math.random() * (max - min + 1)) + min;\n  }\n\n  createGoodFalling() {\n    this.counter += 1;\n    if (this.counter === this.targetCounter) {\n      this.counter = 0;\n      let x = this.createRandom(18, this.canvas.width - 170);\n      let imgIndex = this.createRandom(1, 8);\n      let img = Animation.GOOD_OBJECTS[imgIndex];\n      this.fallings.push(new _falling__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, 0, img, 'good', this.context, this.avatar, this.canvas));\n      this.targetCounter = this.createRandom(200, 400);\n    }\n  }\n\n  createPizzaFalling() {\n    this.pizzaCounter += 1;\n    if (this.pizzaCounter === this.pizzaTarget) {\n      this.pizzaCounter = 0;\n      let x = this.createRandom(18, this.canvas.width - 170);\n      const img = './images/pizza.png';\n      this.fallings.push(new _falling__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, 0, img, 'pizza', this.context, this.avatar, this.canvas));\n      this.pizzaTarget = this.createRandom(200, 400);\n    }\n  }\n\n  createPillowFalling() {\n    this.pillowCounter += 1;\n    if (this.pillowCounter === this.pillowTarget) {\n      this.pillowCounter = 0;\n      let x = this.createRandom(18, this.canvas.width - 170);\n      const img = './images/pillow.png';\n      this.fallings.push(new _falling__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, 0, img, 'pillow', this.context, this.avatar, this.canvas));\n      this.pillowTarget = this.createRandom(200, 400);\n    }\n  }\n\n  updateFallings() {\n    for (let i = 0; i < this.fallings.length; i += 1) {\n      this.fallings[i].update();\n      this.fallings[i].draw();\n    }\n  }\n\n  update() {\n    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);\n    this.avatar.draw();\n    this.avatar.update();\n    this.createGoodFalling();\n    this.createPizzaFalling();\n    this.createPillowFalling();\n    this.updateFallings();\n    this.start();\n  }\n}\n\n// for gameplay may be better to generate at set intervals rather than randomly\n// if so change createObstacle, if this.counter % (target interval) is zero,\n// then generate\n\nAnimation.GOOD_OBJECTS = {\n  1: './images/dog.png',\n  2: './images/drugs.png',\n  3: './images/salad.png',\n  4: './images/wash.png',\n  5: './images/dumbbell.png',\n  6: './images/groceries.png',\n  7: './images/inbox.png',\n  8: './images/tax.png'\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Animation);\n\n//# sourceURL=webpack:///./animation.js?");

/***/ }),

/***/ "./avatar.js":
/*!*******************!*\
  !*** ./avatar.js ***!
  \*******************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Avatar {\n  constructor(x, y, img, context, canvas) {\n    this.x = x;\n    this.y = y;\n    this.context = context;\n    this.image = new Image();\n    this.image.src = img;\n    this.image.onload = this.draw;\n    this.canvas = canvas;\n    this.catchSurfaceTop = this.canvas.height - 135;\n    this.catchSurfaceLeft = this.x + 15;\n    this.catchSurfaceRight = this.x + 50;\n    this.speedX = 0;\n    this.rightPressed = false;\n    this.leftPressed = false;\n    document.addEventListener('keydown', this.keyDownHandler.bind(this));\n    document.addEventListener('keyup', this.keyUpHandler.bind(this));\n    this.update = this.update.bind(this);\n    this.newPos = this.newPos.bind(this);\n    this.hitSides = this.hitSides.bind(this);\n  }\n\n  keyDownHandler(e) {\n    if (e.keyCode == 39) {\n      this.rightPressed = true;\n    } else if (e.keyCode == 37) {\n      this.leftPressed = true;\n    }\n  }\n\n  keyUpHandler(e) {\n    if (e.keyCode == 39) {\n      this.rightPressed = false;\n    } else if (e.keyCode == 37) {\n      this.leftPressed = false;\n    }\n  }\n\n  draw() {\n    this.context.drawImage(this.image, this.x, this.y);\n  }\n\n  updateCatchSurface() {\n    this.catchSurfaceLeft += this.speedX;\n    this.catchSurfaceRight += this.speedX;\n  }\n\n  update() {\n    if (this.rightPressed === true) {\n      this.speedX = 2;\n    } else if (this.leftPressed === true) {\n      this.speedX = -2;\n    } else if (this.rightPressed || this.leftPressed === false) {\n      this.speedX = 0;\n    }\n    this.newPos();\n  }\n\n  newPos() {\n    this.x += this.speedX;\n    this.updateCatchSurface();\n    this.hitSides();\n  }\n\n  hitSides() {\n    const rightSide = this.canvas.width - 216;\n    const leftSide = 0;\n    if (this.x > rightSide) {\n      this.x = rightSide;\n      this.updateCatchSurface();\n    } else if (this.x < leftSide) {\n      this.x = leftSide;\n      this.updateCatchSurface();\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Avatar);\n\n//# sourceURL=webpack:///./avatar.js?");

/***/ }),

/***/ "./falling.js":
/*!********************!*\
  !*** ./falling.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Falling {\n  constructor(x, y, img, type, context, avatar, canvas) {\n    this.x = x;\n    this.y = y;\n    this.speedY = 1.5;\n    this.speedX = 0;\n    this.context = context;\n    this.avatar = avatar;\n    this.canvas = canvas;\n    this.type = type;\n    this.image = new Image();\n    this.image.src = img;\n    this.image.onload = this.draw;\n    this.collided = false;\n    this.update = this.update.bind(this);\n    this.updateCollided = this.updateCollided.bind(this);\n    this.draw = this.draw.bind(this);\n  }\n\n  draw() {\n    this.context.drawImage(this.image, this.x, this.y);\n  }\n\n  didCollide() {\n    const avatarRight = this.avatar.catchSurfaceRight;\n    const avatarLeft = this.avatar.catchSurfaceLeft;\n    const avatarTop = this.avatar.catchSurfaceTop;\n    const fallingRight = this.x + 32;\n    const fallingLeft = this.x;\n    const fallingBottom = this.y + 32;\n    if (fallingBottom < avatarTop || fallingRight < avatarLeft || fallingLeft > avatarRight || fallingBottom > avatarTop + 2) {} else if (this.type === 'good') {\n      this.collided = true;\n      this.avatar.catchSurfaceTop -= 32;\n    }\n  }\n\n  updateCollided() {\n    this.speedY = 0;\n    this.speedX = this.avatar.speedX;\n    this.x += this.speedX;\n    this.hitSides();\n    this.avatar.catchSurfaceRight = this.x + 32;\n    this.avatar.catchSurfaceLeft = this.x;\n  }\n\n  update() {\n    if (this.collided === true) {\n      this.updateCollided();\n    } else {\n      this.didCollide();\n      this.y += this.speedY;\n    }\n  }\n\n  hitSides() {\n    const rightSide = this.canvas.width - 166 - 32;\n    const leftSide = 10;\n    if (this.x > rightSide) {\n      this.x = rightSide;\n    } else if (this.x < leftSide) {\n      this.x = leftSide;\n    }\n  }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Falling);\n\n//# sourceURL=webpack:///./falling.js?");

/***/ })

/******/ });