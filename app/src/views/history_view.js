export async function showHistory({ callbacks, components }) {
  const scores = await callbacks.getScores();

  callbacks.showElement("history");
  callbacks.hideElement("main-options");
  callbacks.hideElement("previous-game");

  renderScores({ callbacks, components, scores });
}

function renderScores({ callbacks, components, scores }) {
  const target = callbacks.getElement("history-table");
  const scoreTable = new components.ScoreTable(scores);

  callbacks.clearContent("history-table");

  target.appendChild(scoreTable);
}

export function resetHistory({ callbacks, database }) {
  callbacks.hideElement("history");
  callbacks.getElement("title").textContent = "Bem Vindo";
  callbacks.showElement("main-options");

  database.reset();

  callbacks.showPopup("Histórico apagado com sucesso!");
}
