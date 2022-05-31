import { useEffect, useState } from "react";
import { Board, Square } from "components";

const defaultSquares = () => new Array(9).fill(null);
const lines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const PlayPage = () => {
  const [squares, setSquares] = useState(defaultSquares());
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const isComputerTurn =
      squares.filter((square) => square !== null).length % 2 === 1;

    const linesThatAre = (a, b, c) => {
      return lines.filter((squaresIndexes) => {
        const squareValues = squaresIndexes.map((index) => squares[index]);
        return (
          JSON.stringify([a, b, c].sort()) ===
          JSON.stringify(squareValues.sort())
        );
      });
    };

    const emptyIndexes = squares
      .map((square, index) => (square === null ? index : null))
      .filter((val) => val !== null);

    const playerWon = linesThatAre("x", "x", "x").length > 0;
    const computerWon = linesThatAre("o", "o", "o").length > 0;

    if (playerWon) {
      setWinner("x");
    }
    if (computerWon) {
      setWinner("o");
    }

    const putComputerAt = (index) => {
      let newSquares = squares;
      newSquares[index] = "o";
      setSquares([...newSquares]);
    };

    if (isComputerTurn && emptyIndexes.length !== 0 && winner === null) {
      const winningLines = linesThatAre("o", "o", null);
      if (winningLines.length > 0) {
        const winIndex = winningLines[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(winIndex);
        return;
      }

      const linesToBlock = linesThatAre("x", "x", null);
      if (linesToBlock.length > 0) {
        const blockIndex = linesToBlock[0].filter(
          (index) => squares[index] === null
        )[0];
        putComputerAt(blockIndex);
        return;
      }

      const linesToContinue = linesThatAre("o", null, null);
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
  }, [squares, winner]);

  const isPlayerTurn =
    squares.filter((square) => square !== null).length % 2 === 0;

  const handleClick = (index) => {
    if (isPlayerTurn) {
      let newSquares = squares;
      newSquares[index] = "x";
      setSquares([...newSquares]);
    }
  };

  const restartGame = () => {
    setSquares([...defaultSquares()]);
    setWinner(null);
  };
  return (
    <div className="relative font-roboto h-screen flex flex-col justify-center items-center space-y-5">
      <nav className="absolute top-0 px-5 lg:px-10 py-5 w-full flex items-center justify-center">
        <h1 className="text-2xl lg:text-4xl font-mono">Tic Tac Toe</h1>
      </nav>
      {!!winner && winner === "x" && (
        <div className="px-5 py-2 bg-success text-2xl rounded-lg">You WON!</div>
      )}
      {!!winner && winner === "o" && (
        <div className="result red">You LOST!</div>
      )}
      {winner && winner === null && (
        <div className="result blue">It is a TIE!</div>
      )}
      <main className="w-full flex justify-center items-center">
        <Board>
          {squares.map((square, index) => (
            <Square
              key={index}
              x={square === "x" ? 1 : 0}
              o={square === "o" ? 1 : 0}
              onClick={() => handleClick(index)}
            />
          ))}
        </Board>
      </main>
      <div
        className="rounded-lg outline-none bg-white text-primary font-medium cursor-pointer px-5 py-2"
        onClick={restartGame}
      >
        Restart Game
      </div>
    </div>
  );
};

export default PlayPage;
