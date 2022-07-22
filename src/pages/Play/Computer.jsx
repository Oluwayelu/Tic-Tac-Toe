/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import { FaPlay } from "react-icons/fa";

import { GameContext } from "context";
import { checkGameState, checkLines, defaultSquares } from "utils";

const ComputerPlayPage = () => {
  const {
    matrix,
    setMatrix,
    gameState,
    setGameState,
    playerSymbol,
    setPlayerSymbol,
    computerSymbol,
    setComputerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isComputerTurn,
    setComputerTurn,
    isGameStarted,
    setGameStarted,
  } = useContext(GameContext);

  const changeTurns = () => {
    setPlayerTurn(!isPlayerTurn);
    setComputerTurn(!isComputerTurn);
  };

  const updateGameMatrix = (index, symbol, playerTurn) => {
    const newMatrix = [...matrix];
    if (playerTurn && newMatrix[index] === null) {
      newMatrix[index] = symbol;
      setMatrix(newMatrix);
      changeTurns();

      const [player, computer] = checkGameState(
        newMatrix,
        playerSymbol,
        computerSymbol
      );

      if (player && computer) {
        setGameState("The Game is a TIE!");
        setComputerTurn(false);
      }
      if (player && !computer) {
        setGameState("You Won!");
        setComputerTurn(false);
      }
      if (!player && computer) {
        setGameState("You Lost");
        setPlayerTurn(false);
      }
    }
  };

  const handleGameStart = () => {
    setPlayerSymbol("x");
    setComputerSymbol("o");

    setPlayerTurn(true);

    console.log("Start: ", isPlayerTurn, isComputerTurn);
  };

  const handleGameUpdate = () => {
    if (playerSymbol === "x") {
      setPlayerTurn(true);
      setGameStarted(true);
    } else {
      setComputerTurn(true);
      setGameStarted(true);
    }
  };

  useEffect(() => {
    handleGameStart();
    // handleGameUpdate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const emptyIndexes = matrix
      .map((value, index) => (value === null ? index : null))
      .filter((val) => val != null);

    const winningLines = checkLines(
      matrix,
      computerSymbol,
      computerSymbol,
      null
    );
    if (winningLines.length > 0) {
      const winIndex = winningLines[0].filter(
        (index) => matrix[index] === null
      )[0];
      updateGameMatrix(winIndex, computerSymbol, isComputerTurn);
      return;
    }

    const linesToBlock = checkLines(matrix, playerSymbol, playerSymbol, null);
    if (linesToBlock.length > 0) {
      const blockIndex = linesToBlock[0].filter(
        (index) => matrix[index] === null
      )[0];
      updateGameMatrix(blockIndex, computerSymbol, isComputerTurn);
      return;
    }

    const linesToContinue = checkLines(matrix, computerSymbol, null, null);
    if (linesToContinue.length > 0) {
      const continueIndex = linesToContinue[0].filter(
        (index) => matrix[index] === null
      )[0];
      updateGameMatrix(continueIndex, computerSymbol, isComputerTurn);
      return;
    }

    const randomIndex =
      emptyIndexes[Math.ceil(Math.random() * emptyIndexes.length)];

    updateGameMatrix(randomIndex, computerSymbol, isComputerTurn);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  console.log(playerSymbol, isComputerTurn, matrix);

  const restart = () => {
    setMatrix([...defaultSquares()]);
    setGameState(null);
    setPlayerTurn(true);
  };
  return (
    <div className="w-full relative font-roboto h-screen flex flex-col justify-center items-center space-y-5">
      <div className="w-full flex justify-around items-center">
        <div className="inline-flex flex-col items-center">
          <p className="text-xl font-medium">Player: {playerSymbol}</p>
        </div>

        <div className="inline-flex flex-col items-center">
          <p className="text-xl font-medium">Computer: o</p>
        </div>
      </div>
      {gameState && <p>{gameState}</p>}
      <main className="w-full flex justify-center items-center">
        <div className="relative">
          {/* {(!isGameStarted || !isPlayerTurn) && (
            <div className="absolute z-30 inset-0 cursor-pointer" />
          )} */}
          {gameState && !isPlayerTurn && (
            <div className="w-full absolute z-30 inset-0 bg-black/40 flex justify-center items-center">
              <div className="inline-flex flex-col justify-center items-center">
                <FaPlay
                  size={30}
                  onClick={restart}
                  className="cursor-pointer"
                />
                <p>Play Again</p>
              </div>
            </div>
          )}
          <div className="w-full bg-primary grid grid-cols-3">
            {matrix.map((value, index) => (
              <div
                key={index}
                onClick={() =>
                  updateGameMatrix(index, playerSymbol, isPlayerTurn)
                }
                className="w-20 h-20 lg:w-28 lg:h-28 text-4xl lg:text-6xl inline-flex justify-center items-center border-2 border-white box-border"
              >
                {value ? (
                  value === "x" ? (
                    <span className="text-success">x</span>
                  ) : (
                    <span className="text-error">o</span>
                  )
                ) : null}
              </div>
            ))}
          </div>
          {/* {matrix.map((row, rIndex) => (
            <div key={rIndex} className="w-full flex bg-primary">
              {row.map((col, cIndex) => (
                <div
                  key={`${rIndex}${cIndex}`}
                  onClick={() =>
                    updateGameMatrix(cIndex, rIndex, playerSymbol, isPlayerTurn)
                  }
                  className="w-20 h-20 lg:w-28 lg:h-28 text-4xl lg:text-6xl inline-flex justify-center items-center border-2 border-white box-border"
                >
                  {col && col !== "null" ? (
                    col === "x" ? (
                      <span className="text-success">x</span>
                    ) : (
                      <span className="text-error">o</span>
                    )
                  ) : null}
                </div>
              ))}
            </div>
          ))} */}
        </div>
      </main>
    </div>
  );
};

export default ComputerPlayPage;
