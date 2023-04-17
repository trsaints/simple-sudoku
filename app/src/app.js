import initialize from "./controller/controller.js";
import Game from "./models/Game.js";
import Sudoku from "./components/Sudoku.js";
import Score from "./models/Score.js";
import ScoreTable from "./components/ScoreTable.js";
import { startGame } from "./services/game_service.js";
import { renderGame, clearGame, updateCountTable } from "./views/game_view.js";
import {
  showElement,
  getElement,
  getElements,
  hideElement,
  clearContent,
} from "./views/dom_view.js";

const deps = {
  callbacks: {
    showElement,
    clearGame,
    getElement,
    getElements,
    hideElement,
    clearContent,
    renderGame,
    startGame,
    updateCountTable
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
