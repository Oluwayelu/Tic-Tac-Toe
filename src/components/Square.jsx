import React from "react";

const Square = (props) => {
  return (
    <div
      className="w-20 h-20 text-4xl lg:text-6xl inline-flex justify-center items-center border-2 border-white box-border"
      {...props}
    >
      {props.x ? "x" : props.o ? "o" : ""}
    </div>
  );
};

export default Square;
