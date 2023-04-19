export function renderGame({ callbacks, components, game }) {
  const grid = callbacks.getElement("grid-content"),
    difficulty = callbacks.getElement("grid-difficulty");

  const stopButton = callbacks.getElement("quit"),
    restartButton = callbacks.getElement("restart"),
    validateButton = callbacks.getElement("validate");

  const { Sudoku } = components;

  callbacks.clearContent("grid-content");

  const mode = {
    easy: "Fácil",
    medium: "Média",
    hard: "Difícil",
  };

  const stop = () => finishGame({ callbacks, components, game });
  const clear = () => resetGame({ callbacks, game });
  const validate = () => showInvalidPositions({ callbacks, game });

  stopButton.removeEventListener("click", stop);
  restartButton.removeEventListener("click", clear);

  showGame({ callbacks });

  difficulty.textContent = `Dificuldade: ${mode[game.difficulty]}`;
  grid.appendChild(new Sudoku(game));

  stopButton.addEventListener("click", stop);
  restartButton.addEventListener("click", clear);
  validateButton.addEventListener("click", validate);

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
  const invalid = !game.compare();

  timer.textContent = `${game.timeElapsed}s`;

  if (invalid) setTimeout(() => updateTimer({ callbacks, game }), 1000);
}

function resetGame({ callbacks, game }) {
  game.grid.reset();

  const editableCells = callbacks.getElements("game-cell");

  editableCells.forEach((cell) => (cell.value = ""));

  clearValidation(callbacks);
  updateCountTable({ callbacks, game });
}

export function finishGame({ callbacks, components, game }) {
  callbacks.clearContent("grid-content");

  callbacks.showElement("game-dialog");
  callbacks.showElement("main-options");
  callbacks.hideElement("game");

  game.stop();

  callbacks.getElement("title").textContent = "Bem Vindo";

  if (game.status === "invalid") return;

  const score = new components.Score(game);
  callbacks.addScore(score);

  showPreviousGame({ callbacks, components, score });
}

function showPreviousGame({ callbacks, components, score }) {
  const scoreTable = new components.ScoreTable([score]);

  callbacks.clearContent("previous-game");
  callbacks.showElement("previous-game");

  callbacks.getElement("previous-game").appendChild(scoreTable);
}

function showInvalidPositions({ callbacks, game }) {
  const invalidPositions = game.grid.validatePositions();

  clearValidation(callbacks);

  invalidPositions.forEach((position) => {
    const invalidCell = getCell(position);

    invalidCell.classList.add("invalid");
  });
}

function getCell(position) {
  return document.querySelector(`[data-cell="${position}"]`);
}

function clearValidation(callbacks) {
  const cells = callbacks.getElements("game-cell");

  const clear = (cell) =>
    cell.classList.contains("invalid") ? cell.classList.remove("invalid") : "";

  cells.forEach(clear);
}
