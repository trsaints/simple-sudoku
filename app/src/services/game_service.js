export function startGame({ callbacks, components, game }) {
  const play = (target) => {
    setNum({ game, target });
    let invalid = !game.compare();

    if (invalid) return;

    document.removeEventListener("input", play);
    document.removeEventListener("input", update);
    callbacks.finishGame({ callbacks, components, game });
  };

  const update = () => {
    callbacks.updateCountTable({ callbacks, game });
  };

  callbacks.renderGame({ callbacks, components, game });

  game.startCounter();

  document.addEventListener("input", play);
  document.addEventListener("input", update);
}

function setNum({ game, target }) {
  const { cell } = target.target.dataset;

  if (!cell) return;

  let position = cell.split("-").map((n) => Number(n)),
    num = +target.target.value,
    values = [num, ...position];

  game.grid.setNum(values);
}
