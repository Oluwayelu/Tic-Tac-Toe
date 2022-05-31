const playerTurn = (squares) => {
  const isPlayerTurn =
    squares.filter((square) => square !== null).length % 2 === 0;

  return isPlayerTurn;
};

export default playerTurn;
