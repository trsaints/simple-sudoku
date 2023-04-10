export function startGame({ callbacks, components, mode }) {
  const game = new components.Game(mode);

  callbacks.renderGame({ callbacks, components, game });
}
