const GAME_STATES = {
  START: 'STARTED',
  END: 'ENDED',
};

/**
 * @class
 * @classdesc - Manages the game state.
 */
class Game {
  /**
   * @param {import('./board.js')} board
   * @param {Object} entityConfig
   */
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

  /**
   * Performs one iteration of the game.
   */
  iterate() {
    this.board.evolveBoard();

    if (this.board.hasNoEntities()) {
      this.#endGame();
    }
  }

  #endGame() {
    this.state = GAME_STATES.END;
  }

  /**
   * @returns {boolean} Whether the game has ended.
   */
  hasNotEnded() {
    return this.state !== GAME_STATES.END;
  }


  /**
   * @returns {string} The string representation of the gameboard.
   */
  display() {
    return this.board.show();
  }

  /**
   * @returns {Object} The various states of the game.
   */
  static get GAME_STATES() {
    return GAME_STATES;
  }
}

module.exports = Game;
