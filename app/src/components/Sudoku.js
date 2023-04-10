import DOMElement from "./DOMElement.js";

export default class Sudoku {
  #generate(game) {
    const { editableFrames } = game.grid;

    const sudoku = document.createDocumentFragment();

    editableFrames.map((row) => {
      const tr = new DOMElement("tr");

      row.map((col) => {
        const cell = new DOMElement("td", ["body__cell"]);
        const input = new DOMElement("input", ["cell__input"]);

        input.setAttribute("type", "tel");
        input.setAttribute("pattern", "[1-9]{1}");

        input.setAttribute(
          "data-cell",
          `${row.indexOf(col)}-${editableFrames.indexOf(row)}`
        );

        if (col !== null) {
          input.setAttribute("readonly", "");
          input.classList.add("filled");
        }

        input.value = col === null ? " " : col;

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
