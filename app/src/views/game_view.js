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

  updateTimer({ callbacks, game });
}

function updateTimer({ callbacks, game }) {
  const timer = callbacks.getElement("timer");
  const invalid = !game.validate();

  timer.textContent = `${game.timeElapsed}s`;

  if (invalid) setTimeout(() => updateTimer({ callbacks, game }), 1000);
}

export function finishGame({ callbacks, components, game}) {
  callbacks.clearContent()
}