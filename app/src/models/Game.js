import Grid from "./Grid.js";

export default class Game {
  #status = "";
  #timeElapsed = 0;
  #difficulty = {
    easy: 24,
    medium: 48,
    hard: 56,
  };
  #grid;

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
    this.#timeElapsed += 1000;
  }

  #endCounter() {
    clearInterval(this.#countTime);
  }

  get grid() {
    return this.#grid;
  }

  get status() {
    return this.#status;
  }

  get timeElapsed() {
    return this.#timeElapsed;
  }

  constructor(mode) {
    this.#grid = new Grid(this.#difficulty[mode]);
  }
}
