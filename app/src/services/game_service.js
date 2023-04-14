export function startGame({ callbacks, components, mode }) {
  const game = new components.Game(mode);

  const setNumber = (target) => {
    const { cell } = target.target.dataset;

    if (!cell) return;

    let position = cell.split("-").map((n) => Number(n));

    let num = +target.target.value;

    let values = [num, ...position];

    game.grid.setNum(values[0], values[1], values[2]);

    console.table(game.grid.editableFrames);
  };

  callbacks.renderGame({ callbacks, components, game });

  document.addEventListener("input", setNumber);
}
