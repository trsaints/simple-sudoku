import DOMElement from "./DOMElement.js";

export default class Sudoku {
  #generate(game) {
    const { editableFrames } = game.grid;

    const sudoku = document.createDocumentFragment();

    editableFrames.map((row) => {
      const tr = new DOMElement("tr", ["body__row"]);

      const rowIndex = editableFrames.indexOf(row);

      row.map((col) => {
        const colIndex = row.indexOf(col),
          colPattern = `${rowIndex}-${colIndex}`;

        const cell = new DOMElement("td", ["row__cell"]);
        const input = new DOMElement("input", ["cell__input"]);

        input.setAttribute("type", "tel");
        input.setAttribute("pattern", "[1-9]{1}");

        if (col !== colPattern) {
          input.setAttribute("readonly", "");
          input.classList.add("filled");
        } else {
          input.setAttribute("data-cell", colPattern);
          input.setAttribute("data-element", "game-cell");
        }

        input.value = col === colPattern ? "" : col;

        cell.appendChild(input);
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
