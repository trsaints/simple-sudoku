import Grid from "./Grid.js";

export default class Game {
  status = "";
  #difficulty = {
    easy: 24,
    medium: 48,
    hard: 56,
  };
  #grid;

  get grid() {
    return this.#grid
  }

  constructor(mode) {
    this.#grid = new Grid(this.#difficulty[mode]);
  }
}
