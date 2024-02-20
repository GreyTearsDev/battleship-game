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
  }

  const getBoard = () => board;

  const isLegal = (ship, row, col) => {
    if (ship.orientation() === "horizontal") {
      return ship.length + col < board[row].length;
    } else {
      return ship.length + row < board.length;
    }
  }
  
  return {
    placeShip,
    getBoard,
    isLegal
  }
}

module.exports = GameBoard;
