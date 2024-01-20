const Board = require('./board');
const Game = require('./game');
const entityConfig = require('../config/entity_config.json');

const gridHeight = parseInt(process.env.GRID_HEIGHT);
const gridWidth = parseInt(process.env.GRID_WIDTH);
const iterationSpeed = parseInt(process.env.ITERATION_SPEED_MS);

const board = new Board(gridHeight, gridWidth);
const game = new Game(board, entityConfig);

let iteration = 0;

(async () => {
  console.clear();
  await new Promise(r => setTimeout(r, iterationSpeed));

  while(game.hasNotEnded()) {
    iteration += 1;

    if (iteration > 1) {
      game.iterate();
    }

    console.log(game.display());
    console.log(`Iteration: ${iteration}`);
    await new Promise(r => setTimeout(r, iterationSpeed));

    console.clear();
  }
})();

