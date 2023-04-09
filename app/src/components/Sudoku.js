import DOMElement from "./DOMElement.js";

export default class Sudoku {
  #generate(game) {
    const { editableFrames } = game.grid;

    const sudoku = document.createDocumentFragment();

    editableFrames.map((row) => {
      const tr = new DOMElement("tr");

      row.map((col) => {
        const cell = new DOMElement("td", ["body__cell"]);

        cell.setAttribute(
          "data-cell",
          `${row.indexOf(col)}-${editableFrames.indexOf(row)}`
        );

        cell.textContent = col === null ? " " : col;

        tr.appendChild(cell);
      });

      sudoku.appendChild(tr);
    });

    return sudoku;
  }

  constructor(game) {
    return this.#generate(game);
  }
}
