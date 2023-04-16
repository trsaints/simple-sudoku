import initialize from "./controller/controller.js";
import Game from "./models/Game.js";
import Sudoku from "./components/Sudoku.js";
import Score from "./models/Score.js";
import ScoreTable from "./components/ScoreTable.js";
import { startGame } from "./services/game_service.js";
import { renderGame, clearGame } from "./views/game_view.js";
import {
  showElement,
  getElement,
  hideElement,
  clearContent,
} from "./views/dom_view.js";

const deps = {
  callbacks: {
    showElement,
    clearGame,
    getElement,
    hideElement,
    clearContent,
    renderGame,
    startGame,
  },
  components: {
    Game,
    Sudoku,
    Score,
    ScoreTable
  },
  database: {},
};

initialize(deps);
