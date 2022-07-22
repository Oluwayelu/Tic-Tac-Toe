import winingRule from "./winingRule";

export { default as winingRule } from "./winingRule";
export { default as putComputerAt } from "./putComputerAt";

export const defaultSquares = () => new Array(9).fill(null);
// export const defaultSquares = () => [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];
export const randomValue = () => {
  const values = ["x", "o"];
  const player1 = values[Math.floor(Math.random() * values.length)];
  const player2 = values[values.length - 1 - values.indexOf(player1)];

  return { player1, player2 };
};

export const checkGameStateN = (matrix, playerSymbol) => {
  for (let i = 0; i < matrix.length; i++) {
    let row = [];
    for (let j = 0; j < matrix[i].length; j++) {
      row.push(matrix[i][j]);
    }

    if (row.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (row.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    let column = [];
    for (let j = 0; j < matrix[i].length; j++) {
      column.push(matrix[j][i]);
    }

    if (column.every((value) => value && value === playerSymbol)) {
      return [true, false];
    } else if (column.every((value) => value && value !== playerSymbol)) {
      return [false, true];
    }
  }

  if (matrix[1][1]) {
    if (matrix[0][0] === matrix[1][1] && matrix[2][2] === matrix[1][1]) {
      if (matrix[1][1] === playerSymbol) return [true, false];
      else return [false, true];
    }

    if (matrix[2][0] === matrix[1][1] && matrix[0][2] === matrix[1][1]) {
      if (matrix[1][1] === playerSymbol) return [true, false];
      else return [false, true];
    }
  }

  //Check for a tie
  if (matrix.every((m) => m.every((v) => v !== null))) {
    return [true, true];
  }

  return [false, false];
};

export const checkLines = (matrix, a, b, c) => {
  return winingRule.filter((squareIndex) => {
    const squareValue = squareIndex.map((index) => matrix[index]);
    return (
      JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValue.sort())
    );
  });
};

export const checkGameState = (matrix, playerSymbol, otherSymbol = null) => {
  if (checkLines(matrix, playerSymbol, playerSymbol, playerSymbol).length > 0) {
    return [true, false];
  } else if (
    otherSymbol &&
    checkLines(matrix, otherSymbol, otherSymbol, otherSymbol).length > 0
  ) {
    return [false, true];
  }

  if (matrix.every((m) => m !== null)) {
    return [true, true];
  }
  return [false, false];
};

export const computerMoves = () => {
  
}