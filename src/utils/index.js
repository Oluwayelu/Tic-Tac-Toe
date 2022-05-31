export { default as winingRule } from "./winingRule";
export { default as putComputerAt } from "./putComputerAt";

export const defaultSquares = () => new Array(9).fill(null);

export const randomValue = () => {
  const values = ["x", "o"];
  const player1 = values[Math.floor(Math.random() * values.length)];
  const player2 = values[values.length - 1 - values.indexOf(player1)];

  return { player1, player2 };
};
