const HanoiGame = require('../solution/game.js');
const HanoiView = require('./hanoi-view.js');

$( () => {
  const rootEl = $('.hanoi');
  const game = new HanoiGame();
  const view = new HanoiView(game, rootEl);
  console.log("yo");
});
