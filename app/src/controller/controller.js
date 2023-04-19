export default function initialize({ callbacks, components, database }) {
  init({ callbacks, components, database });
}

function init({ callbacks, components, database }) {
  const actions = {
    show: () => {
      callbacks.showElement("game-dialog");
      callbacks.getElement("game-dialog").showModal();
    },
    start: () => {
      const { difficulty } = callbacks.getElement("game-form").elements;

      const game = new components.Game(difficulty.value)

      callbacks.startGame({ callbacks, components, game });
    },
  };

  listenActions(actions);
  hideOnKeydown(callbacks);
  removeSubmitEvent(callbacks);

  if (database.checkPreload()) return;

  callbacks.configureDB();
}

function listenActions(actions) {
  document.addEventListener("click", ({ target }) => {
    const { element } = target.dataset;

    if (actions[element]) actions[element]();
  });
}

function removeSubmitEvent(callbacks) {
  callbacks
    .getElement("game-form")
    .addEventListener("submit", (e) => e.preventDefault());
}

function hideOnKeydown(callbacks) {
  document.addEventListener("keydown", ({ key }) => {
    if (key !== "Escape") return;

    callbacks.hideElement("game-dialog");
  });
}
