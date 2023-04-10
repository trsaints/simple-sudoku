export function renderGame({ callbacks, components, game }) {
  const grid = callbacks.getElement("grid-content"),
    difficulty = callbacks.getElement("grid-difficulty");

  const { Sudoku } = components;

  callbacks.clearContent("grid-content");

  const mode = {
    easy: "Fácil",
    medium: "Média",
    hard: "Difícil",
  };

  callbacks.getElement("game-dialog").close();
  callbacks.hideElement("game-dialog");
  callbacks.hideElement("main-options");
  callbacks.showElement("game");

  difficulty.textContent = `Dificuldade: ${mode[game.difficulty]}`;
  grid.appendChild(new Sudoku(game));
}
