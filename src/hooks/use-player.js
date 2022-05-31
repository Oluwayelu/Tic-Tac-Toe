import { useState, useEffect } from "react";
import { randomValue } from "utils";

const usePlayer = (player) => {
  const [playerValue, setPlayerValue] = useState({
    player1: "",
    player2: "",
  });
  const { player1, player2 } = randomValue();
  useEffect(() => {
    setPlayerValue({
      player1,
      player2,
    });
  }, []);

  return playerValue;
};

export default usePlayer;
