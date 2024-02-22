'use strict';
import Ship from "./ship";

function GameBoard() {
  const boardSize = 10; 
  const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
  const missedShots = new Set();

  const ships = [];
  

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
    ships.push(ship)
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
  
  /**
   * Handles receiving an attack on the game board.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   * @returns {boolean} - True if the attack hits a ship, false otherwise.
   */
  const receiveAttack = (row, col) => {
    if (board[row][col] === 0) {
      missedShots.add([row,col].toString());
      return false;
    }
    
    const shipId = board[row][col];
    for (let ship of ships) {
      if (ship.length === shipId) {
        ship.hit()
      }
    }
    return true
  }

  /**
   * Retrieves the set of missed shots on the game board.
   * @returns {Set} - The set containing the coordinates of missed shots.
   */
  const getMissedShots = () => missedShots;

    /**
   * Checks if all ships on the game board are sunk.
   * @returns {boolean} - True if all ships are sunk, false otherwise.
   */
  const allShipsSunk = () => {
    for (let ship in ships) {
      if (!ship.isSunk()) return false;
    }
    return true;
  }
  
  return {
    placeShip,
    getBoard,
    isLegal,
    receiveAttack, 
    getMissedShots,
    allShipsSunk,
  }
}

module.exports = GameBoard;
