/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const HanoiGame = __webpack_require__(1);
	const HanoiView = __webpack_require__(2);

	$( () => {
	  const rootEl = $('.hanoi');
	  const game = new HanoiGame();
	  const view = new HanoiView(game, rootEl);
	  console.log("yo");
	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	class Game {
	  constructor() {
	    this.towers = [[3,2,1], [], []];
	    this.wonLength = this.towers[0].length;
	  }

	  isValidMove(startTowerIdx, endTowerIdx) {
	      const startTower = this.towers[startTowerIdx];
	      const endTower = this.towers[endTowerIdx];

	      if (startTower.length === 0) {
	        return false;
	      } else if (endTower.length == 0) {
	        return true;
	      } else {
	        const topStartDisc = startTower[startTower.length - 1];
	        const topEndDisc = endTower[endTower.length - 1];
	        return topStartDisc < topEndDisc;
	      }
	  }

	  isWon() {
	      // move all the discs to the last or second tower
	      return (this.towers[2].length === this.wonLength) || (this.towers[1].length === this.wonLength);
	  }

	  move(startTowerIdx, endTowerIdx) {
	      if (this.isValidMove(startTowerIdx, endTowerIdx)) {
	        this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
	        return true;
	      } else {
	        return false;
	      }
	  }

	  print() {
	      console.log(JSON.stringify(this.towers));
	  }

	  promptMove(reader, callback) {
	      this.print();
	      reader.question("Enter a starting tower: ", start => {
	        const startTowerIdx = parseInt(start);
	        reader.question("Enter an ending tower: ", end => {
	          const endTowerIdx = parseInt(end);
	          callback(startTowerIdx, endTowerIdx)
	        });
	      });
	  }

	  run(reader, gameCompletionCallback) {
	      this.promptMove(reader, (startTowerIdx, endTowerIdx) => {
	        if (!this.move(startTowerIdx, endTowerIdx)) {
	          console.log("Invalid move!");
	        }

	        if (!this.isWon()) {
	          // Continue to play!
	          this.run(reader, gameCompletionCallback);
	        } else {
	          this.print();
	          console.log("You win!");
	          gameCompletionCallback();
	        }
	      });
	  }
	}

	module.exports = Game;


/***/ },
/* 2 */
/***/ function(module, exports) {

	class HanoiView {
	  constructor(game, rootEl) {
	    this.game = game;
	    this.rootEl = rootEl;
	    this.setupTowers();
	    this.render();
	    this.firstClick = undefined;
	    this.clicktower();
	  }

	  setupTowers() {
	    for (let h = 0; h < 3; h++) {
	      const $ul = $("<ul></ul>");
	      $ul.data("tower",h);
	      for (let i = 0; i < 3; i++) {
	        const $li = $("<li></li>");
	        $li.addClass("tower");
	        $li.data("pos", `${h},${i}`);
	        // console.log($li.data("pos"));
	        $ul.append($li);
	      }
	    this.rootEl.append($ul);
	    }
	  }

	  clicktower() {
	    let $ul = $("ul");
	    $ul.on("click", event => {
	      const tower = event.currentTarget;
	      const $tower = $(tower);
	      if (this.firstClick === undefined) {
	        this.firstClick = $tower.data("tower");
	        $tower.addClass("selected");
	      } else {
	        this.game.move(this.firstClick, $tower.data("tower"));
	        this.firstClick = undefined;
	        $ul.removeClass();
	        this.render();
	        if (this.game.isWon()) {
	          console.log($(".won"));
	          $(".won").attr("style", "display: flex;");
	          alert("You win!");
	        }
	      }
	    });
	  }

	  render() {
	    let $li = $("li");
	    $li.removeClass();
	    $li.each((idx) => {
	      const $el = $($li[idx]);
	      let pos = $el.data("pos").split(",");
	      let x = parseInt(pos[0]);
	      let y = parseInt(pos[1]);
	      let size = this.game.towers[x][y];
	      if (size === 1) {
	        $el.addClass("tower small");
	      } else if (size === 2) {
	        $el.addClass("tower mid");
	      } else if (size === 3) {
	        $el.addClass("tower large");
	      }
	    });
	  }
	}

	module.exports = HanoiView;


/***/ }
/******/ ]);