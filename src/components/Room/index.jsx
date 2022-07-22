import { useState } from "react";
import { Link } from "react-router-dom";
import { Loader, Modal } from "components";


const Room = ({ id, show, close }) => {
  const [info, setInfo] = useState({
    error: "",
    roomName: "",
    userName: "",
    loading: false,
  });

  const onChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const { roomName, userName, loading } = info;

  return (
    <Modal id={id} show={show} close={close}>
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex justify-center items-center">
          <Loader />
        </div>
      )}
      <p className="text-xs lg:text-sm text-center text-red-500">
        {info.error && info.error}
      </p>
      <div className="w-full flex flex-col items-center justify-center space-y-3">
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
          className="w-full md:w-1/2 py-1 flex justify-center bg-success rounded"
        >
          {loading ? "Joining" : "Play"}
        </Link>
      </div>
    </Modal>
  );
};

export default Room;
