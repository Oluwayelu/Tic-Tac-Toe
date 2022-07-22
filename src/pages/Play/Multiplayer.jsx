import { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { defaultSquares, checkGameState } from "utils";
import { GameContext } from "context";
import { useQuery } from "hooks";
import { GameService, SocketService } from "services";
import { FaPlay } from "react-icons/fa";
import { MdChatBubble } from "react-icons/md";
import { WELCOME } from "constants/routes";
import { Loader } from "components";

const MultiPlayerPage = () => {
  const query = useQuery();
  const { push } = useHistory();
  const {
    matrix,
    setMatrix,
    isInRoom,
    gameState,
    setGameState,
    playerSymbol,
    setPlayerSymbol,
    isPlayerTurn,
    setPlayerTurn,
    isGameStarted,
    setGameStarted,
  } = useContext(GameContext);

  console.log("Started: ", isGameStarted, "PlayerTurn: ", isPlayerTurn);

  const updateGameMatrix = (index, symbol, playerTurn) => {
    const newMatrix = [...matrix];

    if (playerTurn && newMatrix[index] === null) {
      newMatrix[index] = symbol;
      setMatrix(newMatrix);

      const socket = SocketService.socket;
      if (socket) {
        GameService.updateGame(socket, newMatrix);

        const [currentPlayer, otherPlayer] = checkGameState(
          newMatrix,
          playerSymbol
        );
        if (currentPlayer && otherPlayer) {
          GameService.gameWin(socket, "The Game is a TIE!");
          setGameState("The Game is a TIE!");
        } else if (currentPlayer && !otherPlayer) {
          GameService.gameWin(socket, "You Lost!");
          setGameState("You Won!");
        }

        setPlayerTurn(false);
      }
    }
  };

  const leaveGameRoom = () => {
    if (SocketService.socket) {
      GameService.leaveGameRoom(SocketService.socket, query.get("roomId"));
      push(WELCOME);
    }
  };

  const handleGameUpdate = () => {
    if (SocketService.socket)
      GameService.onGameUpdate(SocketService.socket, (newMatrix) => {
        setMatrix(newMatrix);
        checkGameState(newMatrix, playerSymbol);
        setPlayerTurn(true);
      });
  };

  const handleGameStart = () => {
    if (SocketService.socket)
      GameService.onStartGame(SocketService.socket, (options) => {
        setGameStarted(true);
        setPlayerSymbol(options.symbol);
        if (options.start) setPlayerTurn(true);
        else setPlayerTurn(false);
      });
  };

  const handleLeaveGame = () => {
    if (SocketService.socket)
      GameService.onLeaveGameRoom(SocketService.socket, (message) => {
        setPlayerTurn(false);
        setGameState(message);
      });
  };

  const handleGameWin = () => {
    if (SocketService.socket)
      GameService.onGameWin(SocketService.socket, (message) => {
        console.log("Here", message);
        setPlayerTurn(false);
        setGameState(message);
      });
  };

  useEffect(() => {
    handleGameUpdate();
    handleGameStart();
    handleLeaveGame();
    handleGameWin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const restart = () => {
    if (SocketService.socket) {
      setMatrix([...defaultSquares()]);
      GameService.updateGame(SocketService.socket, [...defaultSquares()]);

      GameService.gameWin(SocketService.socket, null);
      setGameState(null);
      setPlayerTurn(true);
    }
  };
  return !isInRoom ? (
    <div className="w-full relative font-roboto h-screen flex flex-col justify-center items-center space-y-5">
      <Loader />
    </div>
  ) : (
    <div className="w-full relative font-roboto h-screen flex flex-col justify-center items-center space-y-5">
      {gameState && <p>{gameState}</p>}
      <main className="w-full flex justify-center items-center">
        <div className="relative">
          {(!isGameStarted || !isPlayerTurn) && (
            <div className="absolute z-30 inset-0 cursor-pointer" />
          )}
          {!isGameStarted && (
            <div className="w-full absolute z-30 inset-0 bg-black/40 flex justify-center items-center text-center">
              <h2>Waiting for Other Player to Join to Start the Game!</h2>
            </div>
          )}
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
                  onClick={() => updateGameMatrix(cIndex, rIndex, playerSymbol)}
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

          {!isPlayerTurn && isGameStarted && !gameState && (
            <p className="text-center">Opponents turn...</p>
          )}
        </div>
      </main>

      <div className="absolute bottom-5 lg:bottom-10 left-0 right-0 flex justify-center">
        <button
          onClick={leaveGameRoom}
          className="px-10 py-2 bg-red-600 text-white rounded-lg"
        >
          Leave Game
        </button>
      </div>

      <div className="absolute bottom-14 lg:bottom-20 right-5">
        <button className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-success flex items-center justify-center">
          <MdChatBubble className="w-6 h-6 md:w-10 md:h-10" />
        </button>
      </div>
    </div>
  );
};

export default MultiPlayerPage;
