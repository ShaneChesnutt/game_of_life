const GAME_STATES = {
  START: 'STARTED',
  END: 'ENDED',
};

class Game {
  constructor(board, entityConfig) {
    this.board = board;
    this.state = GAME_STATES.START;
    this.#intializeGameBoardEntities(entityConfig);
  }

  #intializeGameBoardEntities({ entityPoints }) {
    for(const point of entityPoints) {
      this.#addEntityToBoard(point);
    }
  }

  #addEntityToBoard({ y, x }) {
    this.board.addEntity(y, x);
  }

  iterate() {
    this.board.evolveBoard();

    if (this.board.hasNoEntities()) {
      this.#endGame();
    }
  }

  #endGame() {
    this.state = GAME_STATES.END;
  }

  hasNotEnded() {
    return this.state !== GAME_STATES.END;
  }

  display() {
    return this.board.show();
  }

  static get GAME_STATES() {
    return GAME_STATES;
  }
}

module.exports = Game;
