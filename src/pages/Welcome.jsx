import Particles from "react-tsparticles";
import { PLAY } from "constants/routes";
import { FaPlay, FaUser, FaUsers } from "react-icons/fa";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Modal } from "components";
import { PlayerContext } from "context/player";

const WelcomePage = () => {
  const { players, setPlayers } = useContext(PlayerContext);
  const [showModal, setShowModal] = useState(false);
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
      <h1 className="absolute top-20 font-mono text-4xl lg:text-6xl">
        Tic Tac Toe
      </h1>
      <p
        onClick={toggleModal}
        htmlFor="my-modal"
        className="btn btn-ghost modal-button absolute top-32 lg:top-36 font-mono text-2xl lg:text-4xl text-success"
      >
        How to play?
      </p>
      <Modal show={showModal} close={toggleModal} />
      <div className="absolute w-40 h-40 border-2 border-white rounded-lg animate-pendulum"></div>
      <div className="absolute w-40 h-40 border-2 border-white rounded-lg animate-anti-pendulum"></div>
      <Link
        to="/play"
        className="absolute w-40 h-40 flex justify-center items-center bg-success rounded-lg"
      >
        <FaPlay size={50} />
      </Link>

      <div className="absolute bottom-20 w-full flex justify-center items-center space-x-10">
        <div
          onClick={() => setPlayers("single-player")}
          className={`p-5 rounded-full border-2 cursor-pointer ${
            players === "single-player"
              ? "border-success scale-125"
              : "border-white scale-90"
          } transition-all duration-300 ease-in-out `}
        >
          <FaUser
            size={30}
            className={`${
              players === "single-player"
                ? "text-success scale-125"
                : "text-white scale-90"
            } transition-all duration-300 ease-in-out `}
          />
        </div>
        <div
          onClick={() => setPlayers("multi-player")}
          className={`p-5 rounded-full border-2 cursor-pointer ${
            players === "multi-player"
              ? "border-success scale-110"
              : "border-white scale-90"
          } transition-all duration-300 ease-in-out`}
        >
          <FaUsers
            size={30}
            className={`${
              players === "multi-player"
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
