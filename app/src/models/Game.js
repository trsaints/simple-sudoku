import Grid from "./Grid.js";

export default class Game {
  #status = "";
  timeElapsed = 0;
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

  get endCounter() {
    return this.#endCounter;
  }

  get setStatus() {
    return this.#setStatus;
  }

  #setStatus(status) {
    this.#status = status;
  }

  #startCounter() {
    setInterval(this.#countTime, 1000);
  }

  #countTime() {
    this.timeElapsed += 1000;
  }

  #endCounter() {
    clearInterval(this.#countTime);
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
    return this.timeElapsed;
  }

  constructor(mode) {
    this.#grid = new Grid(this.#mode[mode]);
    this.#difficulty = mode;
  }
}
