import DOMElement from "./DOMElement.js";

export default class Sudoku {
  #generate(game) {
    const { editableFrames } = game.grid;

    const sudoku = document.createDocumentFragment();

    editableFrames.map((row) => {
      const tr = new DOMElement("tr");

      let currentRow = row;

      row.map((col) => {
        let currentCol = col;

        const cell = new DOMElement("td", ["body__cell"]);
        const input = new DOMElement("input", ["cell__input"]);

        input.setAttribute("type", "tel");
        input.setAttribute("pattern", "[1-9]{1}");

        if (typeof currentCol !== "string") {
          input.setAttribute("readonly", "");
          input.classList.add("filled");
        } else {
          input.setAttribute(
            "data-cell",
            `${editableFrames.indexOf(currentRow)}-${currentRow.indexOf(
              currentCol
            )}`
          );
        }

        input.value = typeof currentCol === "string" ? " " : currentCol;

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
