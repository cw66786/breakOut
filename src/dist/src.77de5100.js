// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"View/CanvasView.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CanvasView = void 0;
var CanvasView = /** @class */function () {
  function CanvasView(canvasName) {
    this.canvas = document.querySelector(canvasName);
    this.context = this.canvas.getContext('2d');
    this.scoreDisplay = document.querySelector('#score');
    this.startButton = document.querySelector('#start');
    this.info = document.querySelector('#info');
  }
  CanvasView.prototype.clear = function () {
    var _a;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };
  CanvasView.prototype.initStartButton = function (startFunction) {
    var _this = this;
    var _a;
    (_a = this.startButton) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
      return startFunction(_this);
    });
  };
  CanvasView.prototype.drawScore = function (score) {
    if (this.scoreDisplay) {
      this.scoreDisplay.innerHTML = score.toString();
    }
  };
  CanvasView.prototype.drawInfo = function (text) {
    if (this.info) {
      this.info.innerHTML = text;
    }
  };
  CanvasView.prototype.drawSprite = function (brick) {
    var _a;
    if (!brick) return;
    (_a = this.context) === null || _a === void 0 ? void 0 : _a.drawImage(brick.image, brick.pos.x, brick.pos.y, brick.width, brick.height);
  };
  CanvasView.prototype.drawBricks = function (bricks) {
    var _this = this;
    bricks.forEach(function (brick) {
      return _this.drawSprite(brick);
    });
  };
  return CanvasView;
}();
exports.CanvasView = CanvasView;
},{}],"sprites/Ball.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Ball = void 0;
var Ball = /** @class */function () {
  function Ball(ballSize, position, speed, image) {
    this.ballSize = ballSize;
    this.position = position;
    this.ballImage = new Image();
    this.ballSize = ballSize;
    this.position = position;
    this.speed = {
      x: speed,
      y: -speed
    };
    this.ballImage.src = image;
  }
  Object.defineProperty(Ball.prototype, "width", {
    //getters for ball
    get: function get() {
      return this.ballSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "height", {
    get: function get() {
      return this.ballSize;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Ball.prototype, "image", {
    get: function get() {
      return this.ballImage;
    },
    enumerable: false,
    configurable: true
  });
  //methods for ball
  Ball.prototype.changeYDirection = function () {
    this.speed.y = -this.speed.y;
  };
  Ball.prototype.changeXDirection = function () {
    this.speed.x = -this.speed.x;
  };
  Ball.prototype.moveBall = function () {
    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  };
  return Ball;
}();
exports.Ball = Ball;
},{}],"sprites/Paddle.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Paddle = void 0;
var Paddle = /** @class */function () {
  function Paddle(speed, paddleWidth, paddleHieght, postition, image) {
    var _this = this;
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHieght = paddleHieght;
    this.postition = postition;
    this.paddleImage = new Image();
    this.handleKeyUp = function (event) {
      if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') _this.moveLeft = false;
      if (event.code === 'ArrowRight' || event.key === 'ArrowRight') _this.moveRight = false;
    };
    this.handleKeyDown = function (event) {
      if (event.code === 'ArrowLeft' || event.key === 'ArrowLeft') _this.moveLeft = true;
      if (event.code === 'ArrowRight' || event.key === 'ArrowRight') _this.moveRight = true;
    };
    this.speed = speed;
    this.paddleWidth = paddleWidth;
    this.paddleHieght = paddleHieght;
    this.postition = postition;
    this.moveLeft = false;
    this.moveRight = false;
    this.paddleImage.src = image;
    //event listeners for movement
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('keyup', this.handleKeyUp);
  }
  Object.defineProperty(Paddle.prototype, "width", {
    //getters for paddle
    get: function get() {
      return this.paddleWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "height", {
    get: function get() {
      return this.paddleHieght;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "pos", {
    get: function get() {
      return this.postition;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "image", {
    get: function get() {
      return this.paddleImage;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingLeft", {
    get: function get() {
      return this.moveLeft;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Paddle.prototype, "isMovingRight", {
    get: function get() {
      return this.moveRight;
    },
    enumerable: false,
    configurable: true
  });
  //methods for paddle
  Paddle.prototype.movePaddle = function () {
    if (this.moveLeft) this.pos.x -= this.speed;
    if (this.moveRight) this.pos.x += this.speed;
  };
  return Paddle;
}();
exports.Paddle = Paddle;
},{}],"Collision.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collision = void 0;
var Collision = /** @class */function () {
  function Collision() {}
  //ball hits brick
  Collision.prototype.isCollidingBrick = function (ball, brick) {
    if (ball.pos.x < brick.pos.x + brick.width && ball.pos.x + ball.width > brick.pos.x && ball.pos.y < brick.pos.y + brick.height && ball.pos.y + ball.height > brick.pos.y) {
      return true;
    }
    return false;
  };
  Collision.prototype.isCollidingBricks = function (ball, bricks) {
    var _this = this;
    var colliding = false;
    bricks.forEach(function (brick, i) {
      if (_this.isCollidingBrick(ball, brick)) {
        ball.changeYDirection();
        if (brick.energy === 1) {
          bricks.splice(i, 1);
        } else {
          brick.energy -= 1;
        }
        colliding = true;
      }
    });
    return colliding;
  };
  //other collisions
  Collision.prototype.checkBallCollision = function (ball, paddle, view) {
    //ball hits paddle
    if (ball.pos.x + ball.width > paddle.pos.x && ball.pos.x < paddle.pos.x + paddle.width && ball.pos.y + ball.height === paddle.pos.y) {
      ball.changeYDirection();
    }
    //check ball collision with walls
    //x check
    if (ball.pos.x > view.canvas.width - ball.width || ball.pos.x < 0) {
      ball.changeXDirection();
    }
    //y check
    if (ball.pos.y < 0 + ball.height) {
      ball.changeYDirection();
    }
  };
  return Collision;
}();
exports.Collision = Collision;
},{}],"images/paddle.png":[function(require,module,exports) {
module.exports = "/paddle.f48d929a.png";
},{}],"images/ball.png":[function(require,module,exports) {
module.exports = "/ball.96931fde.png";
},{}],"images/brick-red.png":[function(require,module,exports) {
module.exports = "/brick-red.c1be1822.png";
},{}],"images/brick-blue.png":[function(require,module,exports) {
module.exports = "/brick-blue.695b92f9.png";
},{}],"images/brick-green.png":[function(require,module,exports) {
module.exports = "/brick-green.e573ebf2.png";
},{}],"images/brick-yellow.png":[function(require,module,exports) {
module.exports = "/brick-yellow.eff6b86b.png";
},{}],"images/brick-purple.png":[function(require,module,exports) {
module.exports = "/brick-purple.088683b7.png";
},{}],"setup.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LEVEL = exports.BRICK_ENERGY = exports.BRICK_IMAGES = exports.BALL_STARTY = exports.BALL_STARTX = exports.BALL_SIZE = exports.BALL_SPEED = exports.PADDLE_SPEED = exports.PADDLE_STARTX = exports.PADDLE_HEIGHT = exports.PADDLE_WIDTH = exports.BRICK_HEIGHT = exports.BRICK_WIDTH = exports.BRICK_PADDING = exports.STAGE_COLS = exports.STAGE_ROWS = exports.STAGE_PADDING = void 0;
var brick_red_png_1 = __importDefault(require("./images/brick-red.png"));
var brick_blue_png_1 = __importDefault(require("./images/brick-blue.png"));
var brick_green_png_1 = __importDefault(require("./images/brick-green.png"));
var brick_yellow_png_1 = __importDefault(require("./images/brick-yellow.png"));
var brick_purple_png_1 = __importDefault(require("./images/brick-purple.png"));
// Grab the canvas element for calculating the brick width
// depending on canvas width
var canvas = document.querySelector('#playField');
// Constants
exports.STAGE_PADDING = 10;
exports.STAGE_ROWS = 20;
exports.STAGE_COLS = 10;
exports.BRICK_PADDING = 5;
exports.BRICK_WIDTH = canvas ? Math.floor((canvas.width - exports.STAGE_PADDING * 2) / exports.STAGE_COLS) - exports.BRICK_PADDING : 100;
exports.BRICK_HEIGHT = canvas ? Math.floor((canvas.height - exports.STAGE_PADDING * 2) / exports.STAGE_ROWS) - exports.BRICK_PADDING : 30;
exports.PADDLE_WIDTH = 150;
exports.PADDLE_HEIGHT = 25;
exports.PADDLE_STARTX = 450;
exports.PADDLE_SPEED = 10;
exports.BALL_SPEED = 5;
exports.BALL_SIZE = 20;
exports.BALL_STARTX = 500;
exports.BALL_STARTY = 400;
exports.BRICK_IMAGES = {
  1: brick_red_png_1.default,
  2: brick_green_png_1.default,
  3: brick_yellow_png_1.default,
  4: brick_blue_png_1.default,
  5: brick_purple_png_1.default
};
exports.BRICK_ENERGY = {
  1: 1,
  2: 1,
  3: 2,
  4: 2,
  5: 3 // Purple brick
};
// prettier-ignore
exports.LEVEL = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 3, 3, 3, 3, 3, 3, 3, 3, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 5, 5, 0, 0, 5, 5, 0, 0];
},{"./images/brick-red.png":"images/brick-red.png","./images/brick-blue.png":"images/brick-blue.png","./images/brick-green.png":"images/brick-green.png","./images/brick-yellow.png":"images/brick-yellow.png","./images/brick-purple.png":"images/brick-purple.png"}],"sprites/Brick.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Brick = void 0;
var Brick = /** @class */function () {
  function Brick(brickWidth, brickHeight, position, brickEnergy, image) {
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.position = position;
    this.brickEnergy = brickEnergy;
    this.brickImage = new Image();
    this.brickWidth = brickWidth;
    this.brickHeight = brickHeight;
    this.brickEnergy = brickEnergy;
    this.position = position;
    this.brickImage.src = image;
  }
  Object.defineProperty(Brick.prototype, "width", {
    //getters for brick
    get: function get() {
      return this.brickWidth;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "height", {
    get: function get() {
      return this.brickHeight;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "energy", {
    get: function get() {
      return this.brickEnergy;
    },
    //setters for brick
    set: function set(energy) {
      this.brickEnergy = energy;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "pos", {
    get: function get() {
      return this.position;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Brick.prototype, "image", {
    get: function get() {
      return this.brickImage;
    },
    enumerable: false,
    configurable: true
  });
  return Brick;
}();
exports.Brick = Brick;
},{}],"helpers.ts":[function(require,module,exports) {
"use strict";

var __spreadArray = this && this.__spreadArray || function (to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBricks = void 0;
var Brick_1 = require("./sprites/Brick");
var setup_1 = require("./setup");
function createBricks() {
  return setup_1.LEVEL.reduce(function (acc, el, i) {
    var row = Math.floor((i + 1) / setup_1.STAGE_COLS);
    var col = i % setup_1.STAGE_COLS;
    var x = setup_1.STAGE_PADDING + col * (setup_1.BRICK_WIDTH + setup_1.BRICK_PADDING);
    var y = setup_1.STAGE_PADDING + row * (setup_1.BRICK_HEIGHT + setup_1.BRICK_PADDING);
    if (el === 0) {
      return acc;
    }
    return __spreadArray(__spreadArray([], acc, true), [new Brick_1.Brick(setup_1.BRICK_WIDTH, setup_1.BRICK_HEIGHT, {
      x: x,
      y: y
    }, setup_1.BRICK_ENERGY[el], setup_1.BRICK_IMAGES[el])], false);
  }, []);
}
exports.createBricks = createBricks;
},{"./sprites/Brick":"sprites/Brick.ts","./setup":"setup.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};
Object.defineProperty(exports, "__esModule", {
  value: true
});
var CanvasView_1 = require("./View/CanvasView");
var Ball_1 = require("./sprites/Ball");
var Paddle_1 = require("./sprites/Paddle");
var Collision_1 = require("./Collision");
//Images
var paddle_png_1 = __importDefault(require("./images/paddle.png"));
var ball_png_1 = __importDefault(require("./images/ball.png"));
//level and colors 
var setup_1 = require("./setup");
//helpers
var helpers_1 = require("./helpers");
// variables 
var gameOver = false;
var score = 0;
function setGameOver(view) {
  view.drawInfo('Game Over');
  gameOver = false;
}
function setGameWin(view) {
  view.drawInfo('Winner!');
  gameOver = false;
}
function gameLoop(view, bricks, paddle, ball, collision) {
  //add images to canvas
  view.clear();
  view.drawBricks(bricks);
  view.drawSprite(paddle);
  view.drawSprite(ball);
  //move the ball
  ball.moveBall();
  //check paddle is in playField
  if (paddle.isMovingLeft && paddle.pos.x > 0 || paddle.isMovingRight && paddle.pos.x < view.canvas.width - paddle.width) {
    paddle.movePaddle();
  }
  collision.checkBallCollision(ball, paddle, view);
  var collidingBrick = collision.isCollidingBricks(ball, bricks);
  if (collidingBrick) {
    score += 1;
    view.drawScore(score);
  }
  //gameover when ball goes out 
  if (ball.pos.y > view.canvas.height) {
    gameOver = true;
  }
  //game won
  if (bricks.length === 0) {
    return setGameWin(view);
  }
  //stop game loop
  if (gameOver) {
    return setGameOver(view);
  }
  requestAnimationFrame(function () {
    return gameLoop(view, bricks, paddle, ball, collision);
  });
}
function startGame(view) {
  //reset display
  score = 0;
  view.drawInfo('');
  view.drawScore(0);
  //create collisions
  var collision = new Collision_1.Collision();
  //create bricks
  var bricks = (0, helpers_1.createBricks)();
  //create ball
  var ball = new Ball_1.Ball(setup_1.BALL_SIZE, {
    x: setup_1.BALL_STARTX,
    y: setup_1.BALL_STARTY
  }, setup_1.BALL_SPEED, ball_png_1.default);
  //create paddle
  var paddle = new Paddle_1.Paddle(setup_1.PADDLE_SPEED, setup_1.PADDLE_WIDTH, setup_1.PADDLE_HEIGHT, {
    x: setup_1.PADDLE_STARTX,
    y: view.canvas.height - setup_1.PADDLE_HEIGHT - 10
  }, paddle_png_1.default);
  gameLoop(view, bricks, paddle, ball, collision);
}
//creates new view
var view = new CanvasView_1.CanvasView('#playField');
view.initStartButton(startGame);
},{"./View/CanvasView":"View/CanvasView.ts","./sprites/Ball":"sprites/Ball.ts","./sprites/Paddle":"sprites/Paddle.ts","./Collision":"Collision.ts","./images/paddle.png":"images/paddle.png","./images/ball.png":"images/ball.png","./setup":"setup.ts","./helpers":"helpers.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63618" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/src.77de5100.js.map