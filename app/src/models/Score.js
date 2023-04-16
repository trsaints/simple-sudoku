export default class Score {
  #timeElapsed = 0;
  #date = "";
  #difficulty = "";

  get timeElapsed() {
    return this.#timeElapsed;
  }

  get date() {
    return this.#date;
  }

  get difficulty() {
    return this.#difficulty;
  }

  constructor({ timeElapsed, difficulty }) {
    this.#timeElapsed = timeElapsed;
    this.#difficulty = difficulty;
    this.#date = new Date().toLocaleDateString();
  }
}
