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
  callbacks.hideElement("previous-game");
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

export function clearGame({ callbacks, components, game = "" }) {
  callbacks.clearContent("grid-content");

  callbacks.showElement("game-dialog");
  callbacks.showElement("main-options");
  callbacks.hideElement("game");

  if (!game) return;

  showPreviousGame({ callbacks, components, game });
}

function showPreviousGame({ callbacks, components, game }) {
  const score = new components.Score(game);
  const scoreTable = new components.ScoreTable([score]);

  callbacks.clearContent("previous-game");
  callbacks.showElement("previous-game");

  callbacks.getElement("previous-game").appendChild(scoreTable);
}
