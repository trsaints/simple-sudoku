import Grid from "./Grid.js";

export default class Game {
  #status = "invalid";
  #timeElapsed = 0;
  #mode = {
    easy: 24,
    medium: 48,
    hard: 56,
  };
  #grid;
  #difficulty = "";

  get startCounter() {
    return this.#startCounter;
  }

  get validate() {
    return this.#validate;
  }

  #setStatus(status) {
    this.#status = status;
  }

  #startCounter() {
    this.#timeElapsed += 1;

    if (this.#status === "invalid")
      setTimeout(() => this.#startCounter(), 1000);
  }

  #validate() {
    if (!this.#grid.compare()) return false;

    this.#setStatus("valid");
    return true;
  }

  get grid() {
    return this.#grid;
  }

  get difficulty() {
    return this.#difficulty;
  }

  get status() {
    return this.#status;
  }

  get timeElapsed() {
    return this.#timeElapsed;
  }

  constructor(mode) {
    this.#difficulty = mode;
    this.#grid = new Grid(this.#mode[mode]);
  }
}
