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

/**
 * Places a ship on the game board at the specified row and column.
 * @param {Object} ship - The ship object to be placed on the board.
 * @param {number} row - The row index where the ship will be placed.
 * @param {number} col - The column index where the ship will be placed.
 */
  const placeShip = (ship, row, col) => {
    for (let i = 0; i < ship.length; i++) {
      if (ship.orientation() === "horizontal") {
        board[row][col++] = ship.length;
      } else {
        board[row++][col] = ship.lenght;
      }
    }
  }

/**
 * Retrieves the current state of the game board.
 * @returns {Array} The current game board.
 */
  const getBoard = () => board;

/**
 * Checks if placing a ship at the specified row and column is legal.
 * @param {Object} ship - The ship object to be placed on the board.
 * @param {number} row - The row index to check for legality.
 * @param {number} col - The column index to check for legality.
 * @returns {boolean} True if placing the ship is legal, otherwise false.
 */
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
