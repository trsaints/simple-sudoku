export function renderGame({ callbacks, components, game }) {
  const grid = callbacks.getElement("grid-content");
  const { Sudoku } = components;

  callbacks.clearContent("grid-content");

  grid.appendChild(new Sudoku(game));
}
