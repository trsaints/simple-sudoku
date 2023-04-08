import initalize from "./controller/controller.js";
import Game from "./models/Game.js";

const deps = {
  callbacks: {},
  components: {
    Game,
  },
  database: {},
};

initalize(deps);
