/**
 * @typedef {Object} Point
 * @property {number} y - The y-axis grid value.
 * @property {number} x - The x-axis grid value.
 */

/**
 * @class
 * @classdesc Entity of the game.
 */
class Entity {
  /**
   * @param {number} y - The target y-axis location.
   * @param {number} x - The target x-axis location.
   */
  constructor(y, x) {
    this.y = y;
    this.x = x;
    this.state = "ALIVE"
  }

  /**
   * @returns {Array<Point>} The points surrounding the entity.
   */
  neighborPoints() {
    return [
      this.#topLeft(),
      this.#top(),
      this.#topRight(),
      this.#right(),
      this.#bottomRight(),
      this.#bottom(),
      this.#bottomLeft(),
      this.#left(),
    ];
  }

  #topLeft() {
    return {
      y: this.y + 1,
      x: this.x - 1,
    };
  }

  #top() {
    return {
      y: this.y + 1,
      x: this.x,
    };
  }

  #topRight() {
    return {
      y: this.y + 1,
      x: this.x + 1,
    };
  }

  #right() {
    return {
      y: this.y,
      x: this.x + 1,
    };
  }

  #bottomRight() {
    return {
      y: this.y - 1,
      x: this.x + 1,
    };
  }

  #bottom() {
    return {
      y: this.y - 1,
      x: this.x,
    };
  }

  #bottomLeft() {
    return {
      y: this.y - 1,
      x: this.x - 1,
    };
  }

  #left() {
    return {
      y: this.y,
      x: this.x - 1,
    };
  }

  /**
   * Sets the entity's state property to "DEAD".
   */
  die() {
    this.state = "DEAD";
  }

  /**
   * @returns {Boolean} Whether the entity's state is "DEAD".
   */
  isDead() {
    return this.state === "DEAD";
  }
}

module.exports = Entity;
