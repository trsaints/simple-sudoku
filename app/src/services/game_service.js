export function startGame({ callbacks, components, mode }) {
  const game = new components.Game(mode);

  const play = (target) => {
    setNum({ game, target });
    let invalid = !game.validate();

    if (invalid) return;

    document.removeEventListener("input", play);
    callbacks.clearGame({ callbacks, components, game });
  };

  callbacks.renderGame({ callbacks, components, game });

  game.startCounter();

  document.addEventListener("input", play);
}

function setNum({ game, target }) {
  const { cell } = target.target.dataset;

  if (!cell) return;

  let position = cell.split("-").map((n) => Number(n)),
    num = +target.target.value,
    values = [num, ...position];

  game.grid.setNum(values[0], values[1], values[2]);
}
