import LocalDB from "../models/LocalDB.js";

export const gameDB = new LocalDB({
  name: "simple_sudoku",
  objectStores: ["scores"],
});

export function configureDB() {
  gameDB.configure({
    flows: [
      {
        keyPath: "id",
        autoIncrement: true,
      },
    ],
  });
}

export function addScore({ timeElapsed, date, difficulty }) {
  return gameDB.addObject("scores", { timeElapsed, date, difficulty });
}

export async function getScores() {
  return await gameDB.loadAll("scores");
}

export function clearHistory() {
  gameDB.reset();
}
