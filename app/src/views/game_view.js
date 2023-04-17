export function renderGame({ callbacks, components, game }) {
  const grid = callbacks.getElement("grid-content"),
    difficulty = callbacks.getElement("grid-difficulty");

  const stopButton = callbacks.getElement("quit"),
    restartButton = callbacks.getElement("restart");

  const { Sudoku } = components;

  callbacks.clearContent("grid-content");

  const mode = {
    easy: "Fácil",
    medium: "Média",
    hard: "Difícil",
  };

  const stopGame = () => clearGame({ callbacks, components, game });
  const cleanGame = () => resetGame({ callbacks, game });

  stopButton.removeEventListener("click", stopGame);
  restartButton.removeEventListener("click", cleanGame);

  showGame({ callbacks });

  difficulty.textContent = `Dificuldade: ${mode[game.difficulty]}`;
  grid.appendChild(new Sudoku(game));

  stopButton.addEventListener("click", stopGame);
  restartButton.addEventListener("click", cleanGame);

  updateTimer({ callbacks, game });
}

function showGame({ callbacks }) {
  callbacks.getElement("game-dialog").close();
  callbacks.hideElement("game-dialog");
  callbacks.hideElement("main-options");
  callbacks.hideElement("previous-game");
  callbacks.showElement("game");
}

export function updateCountTable({ callbacks, game }) {
  const cells = callbacks.getElements("count");

  const changeContent = (cell) => {
    const { count } = cell.dataset;

    const num = game.grid.editableValues[count];

    cell.textContent = num;
  };

  cells.forEach(changeContent);
}

function updateTimer({ callbacks, game }) {
  const timer = callbacks.getElement("timer");
  const invalid = !game.validate();

  timer.textContent = `${game.timeElapsed}s`;

  if (invalid) setTimeout(() => updateTimer({ callbacks, game }), 1000);
}

function resetGame({ callbacks, game }) {
  game.grid.reset();

  const editableCells = callbacks.getElements("game-cell");

  editableCells.forEach((cell) => (cell.value = ""));

  updateCountTable({ callbacks, game });
}

export function clearGame({ callbacks, components, game }) {
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
