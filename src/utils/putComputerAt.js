const putComputerAt = (index, squares, setSquares) => {
  let newSquares = squares;
  newSquares[index] = "o";
  setSquares([...newSquares]);
};

export default putComputerAt;
