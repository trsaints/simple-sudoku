export function renderGame({ callbacks, components, game }) {
  const grid = callbacks.getElement("grid-content"),
    difficulty = callbacks.getElement("grid-difficulty");

  const stopButton = callbacks.getElement("quit");

  const { Sudoku } = components;

  callbacks.clearContent("grid-content");

  const mode = {
    easy: "Fácil",
    medium: "Média",
    hard: "Difícil",
  };

  const stopGame = () => clearGame({ callbacks, components, game });

  stopButton.removeEventListener("click", stopGame);

  callbacks.getElement("game-dialog").close();
  callbacks.hideElement("game-dialog");
  callbacks.hideElement("main-options");
  callbacks.hideElement("previous-game");
  callbacks.showElement("game");

  difficulty.textContent = `Dificuldade: ${mode[game.difficulty]}`;
  grid.appendChild(new Sudoku(game));

  stopButton.addEventListener("click", stopGame);

  updateTimer({ callbacks, game });
}

function updateTimer({ callbacks, game }) {
  const timer = callbacks.getElement("timer");
  const invalid = !game.validate();

  timer.textContent = `${game.timeElapsed}s`;

  if (invalid) setTimeout(() => updateTimer({ callbacks, game }), 1000);
}

export function clearGame({ callbacks, components, game }) {
  const stopButton = callbacks.getElement("quit");

  callbacks.clearContent("grid-content");

  callbacks.showElement("game-dialog");
  callbacks.showElement("main-options");
  callbacks.hideElement("game");

  game.stop();

  if (game.status === "invalid") return;

  showPreviousGame({ callbacks, components, game });
}

function showPreviousGame({ callbacks, components, game }) {
  const score = new components.Score(game);
  const scoreTable = new components.ScoreTable([score]);

  callbacks.clearContent("previous-game");
  callbacks.showElement("previous-game");

  callbacks.getElement("previous-game").appendChild(scoreTable);
}
