import { GameContext } from "context";
import React, { useContext, useState } from "react";
import { GameService, SocketService } from "services";

const JoinRoom = () => {
  const [roomName, setRoomName] = useState("");
  const [loading, setLoading] = useState(false);

  const { setInRoom } = useContext(GameContext);

  const joinRoom = async (e) => {
    e.preventDefault();

    const socket = SocketService.socket;

    // if (!roomName || roomName.trim() === "" || socket) return;

    setLoading(true);

    const joined = await GameService.joinGameRoom(socket, roomName).catch(
      (err) => {
        alert(err);
      }
    );
    console.log(joined);
    if (joined) setInRoom(true);
    setLoading(false);
  };

  return (
    <form
      onSubmit={joinRoom}
      className="w-full flex flex-col items-center justify-center space-y-3"
    >
      <h1 className="text-2xl md:text-3xl">Enter Room to Join Game</h1>
      <input
        // value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Room name"
        className="px-3 py-1 rounded w-full md:w-1/2 text-primary "
      />

      <input
        // value={roomName}
        onChange={(e) => setRoomName(e.target.value)}
        placeholder="Your name"
        className="px-3 py-1 rounded w-full md:w-1/2 text-primary "
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full md:w-1/2 py-1 bg-success rounded"
      >
        {loading ? "Joining" : "Join Game"}
      </button>
    </form>
  );
};

export default JoinRoom;
