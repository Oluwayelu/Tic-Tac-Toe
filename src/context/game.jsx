import { createContext, useState } from "react";
import { defaultSquares } from "utils";

const defaultState = {
  mode: "vsComputer",
  setMode: () => {},
  matrix: defaultSquares(),
  setMatrix: () => {},
  isInRoom: false,
  setInRoom: () => {},
  gameState: null,
  setGameState: () => {},
  playerSymbol: null,
  setPlayerSymbol: () => {},
  computerSymbol: null,
  setComputerSymbol: () => {},
  isPlayerTurn: false,
  setPlayerTurn: () => {},
  isComputerTurn: false,
  setComputerTurn: () => {},
  isGameStarted: false,
  setGameStarted: () => {},
};

export const GameContext = createContext(defaultState);

const GameProvider = ({ children }) => {
  const [mode, setMode] = useState("vsComputer");
  const [isInRoom, setInRoom] = useState(false);
  const [gameState, setGameState] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [computerSymbol, setComputerSymbol] = useState(null);
  const [isPlayerTurn, setPlayerTurn] = useState(false);
  const [isComputerTurn, setComputerTurn] = useState(false);
  const [isGameStarted, setGameStarted] = useState(false);
  const [matrix, setMatrix] = useState(defaultSquares());

  const gameContextValue = {
    mode,
    setMode,
    matrix,
    setMatrix,
    isInRoom,
    setInRoom,
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
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
