import { FaPlay, FaUser, FaUsers } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Room } from "components";

import { GameContext } from "context";

const WelcomePage = () => {
  const { mode, setMode } = useContext(GameContext);
  const [showModal, setShowModal] = useState(false);
  const [joinRoomModal, setJoinRoomModal] = useState(false);

  // function transOver(e) {
  //   e.target.style.transform = "rotate(245deg)";
  // }
  // function transOut(e) {
  //   e.target.style.transform = "rotate(0deg)";
  // }
  // function trans2Over(e) {
  //   e.target.style.transform = "rotate(345deg)";
  // }
  // function trans2Out(e) {
  //   e.target.style.transform = "rotate(0deg)";
  // }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="relative w-full h-screen flex flex-col justify-center items-center">
      <p
        onClick={toggleModal}
        htmlFor="my-modal"
        className="btn btn-ghost modal-button absolute top-32 lg:top-36 font-mono text-2xl lg:text-4xl text-success"
      >
        How to play?
      </p>
      <Modal id="my-modal" show={showModal} close={toggleModal}>
        <h1 className="text-2xl md:text-4xl text-success font-medium cursor-pointer">
          How to Play?
        </h1>

        <p className="">- First: You sh</p>
      </Modal>
      <div className="absolute w-40 h-40 border-2 border-white rounded-lg animate-pendulum"></div>
      <div className="absolute w-40 h-40 border-2 border-white rounded-lg animate-anti-pendulum"></div>
      <div className="absolute w-40 h-40 flex justify-center items-center bg-success rounded-lg cursor-pointer">
        {mode === "vsComputer" && (
          <Link to="/play">
            <FaPlay size={50} />
          </Link>
        )}

        {mode === "multi-player" && (
          <div>
            <div
              onClick={() => setJoinRoomModal(!joinRoomModal)}
              htmlFor="join-room"
            >
              <FaPlay size={50} />
            </div>
            <Room
              id="join-room"
              show={joinRoomModal}
              close={() => setJoinRoomModal(!joinRoomModal)}
            />
          </div>
        )}
      </div>

      <div className="absolute bottom-20 w-full flex justify-center items-center space-x-10">
        <div
          onClick={() => setMode("vsComputer")}
          className={`p-5 rounded-full border-2 cursor-pointer ${
            mode === "vsComputer"
              ? "border-success scale-125"
              : "border-white scale-90"
          } transition-all duration-300 ease-in-out `}
        >
          <FaUser
            size={30}
            className={`${
              mode === "vsComputer"
                ? "text-success scale-125"
                : "text-white scale-90"
            } transition-all duration-300 ease-in-out `}
          />
        </div>
        <div
          onClick={() => setMode("multi-player")}
          className={`p-5 rounded-full border-2 cursor-pointer ${
            mode === "multi-player"
              ? "border-success scale-110"
              : "border-white scale-90"
          } transition-all duration-300 ease-in-out`}
        >
          <FaUsers
            size={30}
            className={`${
              mode === "multi-player"
                ? "text-success scale-125"
                : "text-white scale-90"
            } transition-all duration-300 ease-in-out `}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
