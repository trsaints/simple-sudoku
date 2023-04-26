import DOMElement from "./DOMElement.js";
import Icon from "./Icon.js";
export default class ScoreTable {
  #generateHeading() {
    const thead = new DOMElement("thead", ["score__heading"]);
    const tr = new DOMElement("tr", ["heading__row"]);

    const timeHeading = new DOMElement("th", ["row__heading"]),
      dateHeading = new DOMElement("th", ["row__heading"]),
      modeHeading = new DOMElement("th", ["row__heading"]);

    const timeText = document.createTextNode("Tempo "),
      dateText = document.createTextNode("Data "),
      modeText = document.createTextNode("Dificuldade ");

    const timeIcon = new Icon("stopwatch"),
      dateIcon = new Icon("calendar"),
      modeIcon = new Icon("info-circle");

    timeHeading.appendChild(timeText);
    timeHeading.appendChild(timeIcon);
    dateHeading.appendChild(dateText);
    dateHeading.appendChild(dateIcon);
    modeHeading.appendChild(modeText);
    modeHeading.appendChild(modeIcon);

    tr.appendChild(timeHeading);
    tr.appendChild(dateHeading);
    tr.appendChild(modeHeading);

    thead.appendChild(tr);

    return thead;
  }

  #generate(scores) {
    const table = new DOMElement("table", ["score"]);
    const thead = this.#generateHeading();
    const tbody = new DOMElement("tbody", ["score__body"]);

    scores.forEach((score) => tbody.appendChild(this.#generateRow(score)));

    table.appendChild(thead);
    table.appendChild(tbody);

    return table;
  }

  #generateRow({ timeElapsed, date, difficulty }) {
    const tr = new DOMElement("tr", ["score__row"]),
      timeCell = new DOMElement("td", ["row__cell"]),
      dateCell = new DOMElement("td", ["row__cell"]),
      modeCell = new DOMElement("td", ["row__cell"]);
    const time = new DOMElement("time", ["cell__time"]);

    const mode = {
      easy: "Fácil",
      medium: "Média",
      hard: "Difícil",
    };

    timeCell.textContent = `${timeElapsed}s`;
    time.textContent = date;
    modeCell.textContent = mode[difficulty];

    dateCell.appendChild(time);

    tr.appendChild(timeCell);
    tr.appendChild(dateCell);
    tr.appendChild(modeCell);

    return tr;
  }

  constructor(scores) {
    return this.#generate(scores);
  }
}
