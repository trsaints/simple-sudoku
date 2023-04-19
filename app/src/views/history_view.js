export async function showHistory({ callbacks, components }) {
  const scores = await callbacks.getScores();
  
  callbacks.showElement("history");
  callbacks.hideElement("main-options");
  callbacks.hideElement('previous-game')

  renderScores({ callbacks, components, scores })
}

function renderScores({ callbacks, components, scores }) {
  const target = callbacks.getElement("history-table");
  const scoreTable = new components.ScoreTable(scores);

  callbacks.clearContent('history-table');

  target.appendChild(scoreTable);
}
