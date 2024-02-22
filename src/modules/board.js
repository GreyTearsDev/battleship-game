import Ship from "./ship";

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

  const missedShots = new Set();

  const ships = {
    carrier: Ship("carrier", 5, false),
    battleship: Ship("battleship", 4, false),
    cruiser: Ship("cruiser", 3, false),
    destroyer: Ship("destroyer", 2, false),
  }

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
  
  const receiveAttack = (row, col) => {
    if (board[row][col] === 0) {
      missedShots.add([row,col].toString());
      return false;
    }
    
    const shipId = board[row][col];
    for (let ship in ships) {
      if (ship.length === shipId) {
        ship.hit()
      }
    }
    return true
  }

  const getMissedShots = () => missedShots;
  
  return {
    placeShip,
    getBoard,
    isLegal,
    receiveAttack, 
    getMissedShots,
  }
}

module.exports = GameBoard;
