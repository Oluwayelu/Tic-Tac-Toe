import { createContext, useState } from "react";

export const PlayerContext = createContext(null);

const PlayerProvider = ({ children }) => {
  const [players, setPlayers] = useState("single-player");

  return (
    <PlayerContext.Provider value={{ players, setPlayers }}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
