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

  const placeShip = (ship, row, col) => {
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation() === "horizontal") {
        board[row][col++] = ship.length;
      } else {
        board[row++][col] = ship.lenght;
      }
    }
    console.log(board)
  }

  const getBoard = () => board;
  
  return {
    placeShip,
    getBoard
  }
}

module.exports = GameBoard;
