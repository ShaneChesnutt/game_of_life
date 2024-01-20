const Entity = require('./entity');

const DEAD_SYMBOL = '.'
const ALIVE_SYMBOL = '#'

class Board {
  constructor(length, width) {
    this.length = length;
    this.width = width;
    this.entities = [];
    this.#init_grid();
  }

  #init_grid() {
    this.grid = [];
    for (let i = 0; i < this.length; i++) {
      this.grid[i] ||= [];
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = DEAD_SYMBOL;
      }
    }
  }

  addEntity(y, x) {
    this.entities.push(new Entity(y, x));
    this.grid[y][x] = ALIVE_SYMBOL;
  }

  evolveBoard() {
    const deadCellsWithAliveNeighbors = {};

    for (const entity of this.entities) {
      let neighbors = 0;

      for(const point of entity.neighborPoints()) {
        if (!this.#pointOnGrid(point)) {
          continue;
        }

        if (this.#gridPointContainsDeadCell(point)) {
          deadCellsWithAliveNeighbors[this.#pointToKey(point)] ||= 0;
          deadCellsWithAliveNeighbors[this.#pointToKey(point)] += 1
        } else {
          neighbors += 1;
        }
      }

      if (neighbors < 2 || neighbors > 3) {
        entity.die();
      }
    }

    this.#processNewEntities(deadCellsWithAliveNeighbors);
    this.#removeDeadEntities();
  }

  #pointOnGrid({y, x}) {
    return ((y >= 0 && y < this.length) && (x >= 0 && x < this.width));
  }

  #gridPointContainsDeadCell(point) {
    return this.grid[point.y][point.x] === DEAD_SYMBOL;
  }

  #pointToKey(point) {
    return `${point.y},${point.x}`;
  }

  #processNewEntities(deadCellsWithAliveNeighbors) {
    Object
      .keys(deadCellsWithAliveNeighbors)
      .filter(k => deadCellsWithAliveNeighbors[k] === 3)
      .forEach((k) => {
        const [y, x] = k.split(',');
        return this.addEntity(parseInt(y), parseInt(x));
      });
  }

  #removeDeadEntities() {
    const aliveEntities = [];

    for (const entity of this.entities) {
      if (entity.isDead()) {
        this.#removeEntityFromGrid(entity.y, entity.x);
      } else {
        aliveEntities.push(entity);
      }
    }

    this.entities = aliveEntities;
  }

  #removeEntityFromGrid(y, x) {
    this.grid[y][x] = DEAD_SYMBOL;
  }

  hasNoEntities() {
    return this.entities.length === 0;
  }

  show() {
    let display = "";

    for (const line of this.grid) {
      display = `${display}${line.join('')}\n`;
    }

    return display;
  }
}

module.exports = Board;
