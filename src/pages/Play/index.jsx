import { useContext, useEffect } from "react";

import { useQuery } from "hooks";
import { GameContext } from "context";
import { GameService, SocketService } from "services";

import MultiPlayerPage from "./Multiplayer";
import ComputerPlayPage from "./Computer";

const PlayPage = () => {
  const query = useQuery();

  const { mode, setInRoom, setGameState } = useContext(GameContext);

  useEffect(() => {
    const joinRoom = async () => {
      const socket = SocketService.socket;
      const roomId = query.get("roomId");

      if (!roomId && socket) return;

      const joined = await GameService.joinGameRoom(socket, roomId).catch(
        (err) => {
          console.log(err);
        }
      );

      if (joined) {
        setInRoom(true);
        setGameState(null);
      }
    };

    joinRoom();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return mode === "multi-player" ? <MultiPlayerPage /> : <ComputerPlayPage />;
};

export default PlayPage;
