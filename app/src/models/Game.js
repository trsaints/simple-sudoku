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
  #active = null;

  get startCounter() {
    return this.#startCounter;
  }

  get validate() {
    return this.#validate;
  }

  get stop() {
    return this.#stop;
  }

  #setStatus(status) {
    this.#status = status;
  }

  #stop() {
    this.#active = false;
  }

  #startCounter() {
    this.#timeElapsed += 1;

    console.log(this.#timeElapsed)

    if (this.#status === "invalid" && this.#active === true)
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

  get active() {
    return this.#active;
  }

  get timeElapsed() {
    return this.#timeElapsed;
  }

  constructor(mode) {
    this.#difficulty = mode;
    this.#grid = new Grid(this.#mode[mode]);
    this.#active = true;
  }
}
