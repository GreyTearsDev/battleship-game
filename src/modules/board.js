function GameBoard() {
  let board = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0], 
    [0,0,0,0,0,0,0,0,0,0],
  ];

  const placeShip = (ship, col, row) => {
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation() === "horizontal") {
        board[row][col++] = ship.length;
      } else {
        board[row++][col] = ship.lenght;
      }
    }
  }

  const getBoard = () => board;
  
  return {
    placeShip,
    getBoard
  }
}

module.exports = GameBoard;
