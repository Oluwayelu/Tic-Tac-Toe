import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-10 h-10 rounded-full border-b border-b-success animate-spin" />
    </div>
  );
};

export default Loader;
