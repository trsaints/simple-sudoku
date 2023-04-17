export default class Grid {
  #range = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  #frames = [];
  #editableFrames = [];
  #editablePositions = [];

  get editableFrames() {
    return this.#editableFrames;
  }

  get reset() {
    return this.#reset;
  }

  get setNum() {
    return this.#setNum;
  }

  get compare() {
    return this.#compare;
  }

  #compare() {
    return (
      JSON.stringify(this.#frames) === JSON.stringify(this.#editableFrames)
    );
  }

  #reset() {
    this.#editablePositions.forEach((position) => {
      const [row, col] = position.split("-");

      this.editableFrames[row][col] = position;
    });

    console.table(this.#editableFrames);
  }

  #getRandom() {
    return Math.floor(Math.random() * this.#range.length);
  }

  #setNum(n, row, col) {
    const notEditable = !this.#editablePositions.includes(`${row}-${col}`);

    if (notEditable)
      return console.warn("Invalid input: cannot set such position");

    if (isNaN(n) || n > 9)
      return console.warn("Invalid input: cannot set such value");

    this.#editableFrames[row][col] = n;
    console.log(`Set ${n} at frame ${row} col ${col}`);
  }

  #removeNumbers(n) {
    // Generate `n` unique pairs of row and column indices
    const indices = new Set();
    while (indices.size < n) {
      const row = this.#getRandom(),
        col = this.#getRandom();

      indices.add(`${row},${col}`);
    }

    // Set the corresponding elements to null
    for (const index of indices) {
      const [row, col] = index.split(",");
      this.#editableFrames[row][col] = `${row}-${col}`;
      this.#editablePositions.push(`${row}-${col}`);
    }
  }

  #fillFrames(mode) {
    // Create an array with the values 1 to 9
    const nums = Array.from(this.#range, (_, i) => i + 1);

    // Shuffle the array randomly
    nums.sort(() => Math.random() - 0.5);

    // Use a sliding window to fill each row of the frames array
    for (let i in this.#range) {
      for (let j in this.#range) {
        this.#frames[i][j] =
          nums[(Number(j) + Number(i) * 3 + Math.floor(Number(i) / 3)) % 9];

        this.#editableFrames[i][j] =
          nums[(Number(j) + Number(i) * 3 + Math.floor(Number(i) / 3)) % 9];
      }
    }

    this.#removeNumbers(mode);
  }

  #setFrames() {
    for (let n in this.#range) {
      this.#frames.push([]);
      this.#editableFrames.push([]);
    }
  }

  constructor(n) {
    this.#setFrames();
    this.#fillFrames(n);

    console.table(this.#editableFrames);
  }
}
