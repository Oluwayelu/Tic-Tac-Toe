import { Link } from "react-router-dom";

const JoinRoom = ({ info, onChange, onSubmit }) => {
  const { roomName, userName, loading } = info;

  return (
    <form
      // onSubmit={onSubmit}
      className="w-full flex flex-col items-center justify-center space-y-3"
    >
      <h1 className="text-2xl md:text-3xl">Join Room</h1>
      <input
        value={roomName}
        name="roomName"
        onChange={onChange}
        placeholder="Room name"
        className="px-3 py-1 rounded w-full md:w-1/2 text-primary "
      />

      <input
        value={userName}
        name="userName"
        onChange={onChange}
        placeholder="Your name"
        className="px-3 py-1 rounded w-full md:w-1/2 text-primary "
      />

      <Link
        to={`/play?roomId=${roomName}&name=${userName}`}
        className="w-full md:w-1/2 py-1 bg-success rounded"
      >
        {loading ? "Joining" : "Join"}
      </Link>
    </form>
  );
};

export default JoinRoom;
