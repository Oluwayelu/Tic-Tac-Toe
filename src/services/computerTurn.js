import checkLines from "./checkLines";
import putComputerAt from "../utils/putComputerAt";

const computerMoves = (squares, isComputerTurn, winner) => {
  const emptyIndexes = squares
    .map((square, index) => (square === null ? index : null))
    .filter((val) => val !== null);

  if (isComputerTurn && emptyIndexes.length !== 0 && winner === null) {
    const winningLines = checkLines(squares, "o", "o", null);
    if (winningLines.length > 0) {
      const winIndex = winningLines[0].filter(
        (index) => squares[index] === null
      )[0];
      putComputerAt(winIndex);
      return;
    }

    const linesToBlock = checkLines(squares, "x", "x", null);
    if (linesToBlock.length > 0) {
      const blockIndex = linesToBlock[0].filter(
        (index) => squares[index] === null
      )[0];
      putComputerAt(blockIndex);
      return;
    }

    const linesToContinue = checkLines(squares, "o", null, null);
    if (linesToContinue.length > 0) {
      const continueIndex = linesToContinue[0].filter(
        (index) => squares[index] === null
      )[0];
      putComputerAt(continueIndex);
      return;
    }

    const randomIndex =
      emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

    putComputerAt(randomIndex);
  }
};

export default computerMoves;
