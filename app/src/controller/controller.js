export default function initalize({ callbacks, components, database }) {
  const dialog = callbacks.getElement("game-dialog");
  const form = callbacks.getElement("game-form");

  const actions = {
    show: () => {
      callbacks.showElement("game-dialog");
      dialog.showModal();
    },
    start: () => {
      const { difficulty } = form.elements;

      callbacks.hideElement("game-dialog");
      callbacks.hideElement("main-options");
      dialog.close();

      callbacks.showElement("game");

      callbacks.startGame({ callbacks, components, mode: difficulty.value });
    },
  };

  document.addEventListener("click", ({ target }) => {
    const { element } = target.dataset;

    if (actions[element]) actions[element]();
  });

  document.addEventListener("keydown", ({ key }) => {
    if (key !== "Escape") return;

    callbacks.hideElement("game-dialog");
  });

  form.addEventListener("submit", (e) => e.preventDefault());
}
