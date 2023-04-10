import initialize from "./controller/controller.js";
import Game from "./models/Game.js";
import Sudoku from "./components/Sudoku.js";
import { startGame } from "./services/game_service.js";
import { renderGame } from "./views/game_view.js";
import {
  showElement,
  getElement,
  hideElement,
  clearContent,
} from "./views/dom_view.js";

const deps = {
  callbacks: {
    showElement,
    getElement,
    hideElement,
    clearContent,
    renderGame,
    startGame,
  },
  components: {
    Game,
    Sudoku
  },
  database: {},
};

initialize(deps);
