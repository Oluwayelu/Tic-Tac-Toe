/* eslint-disable import/no-anonymous-default-export */
import winingRule from "../utils/winingRule";

export default (squares, a, b, c) => {
  return winingRule.filter((squaresIndexes) => {
    const squareValues = squaresIndexes.map((index) => squares[index]);
    return (
      JSON.stringify([a, b, c].sort()) === JSON.stringify(squareValues.sort())
    );
  });
};
