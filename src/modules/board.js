'use strict';

export default function GameBoard() {
  const boardSize = 10; 
  const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
  const missedShots = new Set();
  const ships = [];
  const shipsCoordinates = [];
  
  /**
   * Places a ship on the game board at the specified row and column.
   * @param {Object} ship - The ship object to be placed on the board.
   * @param {number} row - The row index where the ship will be placed.
   * @param {number} col - The column index where the ship will be placed.
   */
  const placeShip = (ship, row, col) => {
    // check if provided coordinates are legal
    if (!isLegal(ship, row, col)) return false;

    for (let i = 0; i < ship.getLength(); i++) {
      if (ship.getOrientation() === "horizontal") {
        shipsCoordinates.push([row, col])
        board[row][col++] = ship.getLength();
      } else {
        shipsCoordinates.push([row, col])
        board[row++][col] = ship.getLength();
      }
    }
    ships.push(ship);
    return true;
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
    if (ship.getOrientation() === "horizontal") {
      // Check if there is enough space horizontally to place the ship
      if (!(ship.getLength() + col <= board[row].length)) return false;
  
      for (let i = 0; i < ship.getLength(); i++) {
        // Check if the coordinates in the path aren't already occupied
        if (board[row][col++] !== 0) return false;
      }
      return true;
    } 
    
    if (ship.getOrientation() === "vertical") {
      // Check if there is enough space vertically to place the ship
      if (!(ship.getLength() + row <= board.length)) return false;
  
      for (let i = 0; i < ship.getLength(); i++) {
        // Check if the coordinates in the path aren't already occupied
        if (board[row++][col] !== 0) return false;
      }
      return true;
    } 
  }
  
  /**
   * Handles receiving an attack on the game board.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   * @returns {boolean} - True if the attack hits a ship, false otherwise.
   */
  const receiveAttack = (row, col) => {
    if (board[row][col] === 0) {
      missedShots.add([row,col]);
      return false;
    }
    
    const shipId = board[row][col];
    for (let ship of ships) {
      if (ship.getLength() === shipId) {
        ship.hit();
      }
    }
    board[row][col] = 0;
    return true;
  }

  /**
   * Retrieves the set of missed shots on the game board.
   * @returns {Set} - The set containing the coordinates of missed shots.
   */

  /**
   * Checks if all ships on the game board are sunk.
   * @returns {boolean} - True if all ships are sunk, false otherwise.
   */
  const allShipsSunk = () => {
    for (let ship of ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
  
  return {
    ships,
    placeShip,
    shipsCoordinates,
    getBoard,
    isLegal,
    receiveAttack, 
    allShipsSunk,
  }
}

