export default class Grid {
  #range = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  #frames = [];
  #editableFrames = [];
  #editablePositions = [];

  get editableFrames() {
    return this.#editableFrames;
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

  #getRandom() {
    return Math.floor(Math.random() * this.#range.length);
  }

  #setNum(n, row, col) {
    const notEditable = !this.#editablePositions.includes(`${row}-${col}`);

    if (typeof n !== "number" || notEditable)
      return console.warn("You cannot edit this position!");

    this.#editableFrames[row][col] = n;
    console.log(`Set ${n} at frame ${row} col ${col}`);
  }

  #removeNumbers(n) {
    // Generate `n` unique pairs of row and column indices
    const indices = new Set();
    while (indices.size < n) {
      const i = this.#getRandom(),
        j = this.#getRandom();

      indices.add(`${i},${j}`);
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
