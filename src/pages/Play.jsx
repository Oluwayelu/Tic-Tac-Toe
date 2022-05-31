import { useEffect, useState } from "react";
import { Board, Square } from "components";
import { usePlayer } from "hooks";
import { defaultSquares } from "utils";
import checkLines from "services/checkLines";
import { Link } from "react-router-dom";

const PlayPage = () => {
  const [squares, setSquares] = useState(defaultSquares());
  const { player1, player2 } = usePlayer();
  const isPlayer1Turn =
    squares.filter((square) => square !== null).length % 2 === 0;
  const isPlayer2Turn =
    squares.filter((square) => square !== null).length % 2 === 1;

  const emptyIndexes = squares
    .map((square, index) => (square === null ? index : null))
    .filter((val) => val !== null);

  const player1Won = checkLines(squares, player1, player1, player1).length > 0;
  const player2Won = checkLines(squares, player2, player2, player2).length > 0;

  const play = (index) => {
    if (emptyIndexes.includes(index) && !player1Won && !player2Won) {
      if (isPlayer1Turn) {
        let newSquares = squares;
        newSquares[index] = player1;
        setSquares([...newSquares]);
      }
      if (isPlayer2Turn) {
        let newSquares = squares;
        newSquares[index] = player2;
        setSquares([...newSquares]);
      }
    }
  };

  const restart = () => {
    setSquares([...defaultSquares()]);
  };

  return (
    <div className="relative font-roboto h-screen flex flex-col justify-center items-center space-y-5">
      <nav className="absolute top-0 px-5 lg:px-10 py-5 w-full flex items-center justify-center">
        <Link to="/">
          <h1 className="text-2xl lg:text-4xl font-mono">Tic Tac Toe</h1>
        </Link>
      </nav>

      {player1Won && (
        <div className="px-5 py-2 bg-success text-2xl rounded-lg">
          Player 1 WON!
        </div>
      )}

      {player2Won && (
        <div className="px-5 py-2 bg-success text-2xl rounded-lg">
          Player 2 WON!
        </div>
      )}

      <main className="w-full flex justify-center items-center">
        <Board>
          {squares.map((square, index) => (
            <Square
              key={index}
              x={square === "x" ? 1 : 0}
              o={square === "o" ? 1 : 0}
              onClick={() => play(index)}
            />
          ))}
        </Board>
      </main>

      <div
        className="rounded-lg outline-none bg-white text-primary font-medium cursor-pointer px-5 py-2"
        onClick={restart}
      >
        Restart Game
      </div>
    </div>
  );
};

export default PlayPage;
