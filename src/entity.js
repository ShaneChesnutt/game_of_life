class Entity {
  constructor(y, x) {
    this.y = y;
    this.x = x;
    this.state = "ALIVE"
  }

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

  die() {
    this.state = "DEAD";
  }

  isDead() {
    return this.state === "DEAD";
  }
}

module.exports = Entity;
