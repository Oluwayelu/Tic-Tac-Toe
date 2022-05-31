import React from "react";

const Board = (props) => {
  return (
    <div className="w60 grid grid-cols-3 border border-primary" {...props} />
  );
};

export default Board;
