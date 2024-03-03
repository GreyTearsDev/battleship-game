'use strict'

/**
 * Returns an array of adjacent grid cells that have not been attacked.
 * @param {Object} player - The player object representing the AI player.
 * @param {number} row - The row index of the current cell.
 * @param {number} col - The column index of the current cell.
 * @returns {Array} An array of adjacent grid cells that have not been attacked.
 */
export function getAdjacentCells(player, row, col) {
  const board = player.gameboard.getBoard();
  const usedCoordinates = player.usedCoordinates;
  const adjacentCells = [];
  const top = row - 1;
  const bottom = row + 1;
  const left = col - 1;
  const right = col + 1;
  
  if (top >= 0 && !usedCoordinates.has([top, col])) {
    adjacentCells.push([top, col])
  }; 

  if (bottom <= board.length && !usedCoordinates.has([bottom, col])) {
    adjacentCells.push([bottom, col]);
  } 

  if (left >= 0 && !usedCoordinates.has([row, left])) {
    adjacentCells.push([row, left]);
  } 

  if (right <= board[row].length && !usedCoordinates.has([row, right])) {
    adjacentCells.push([row, right]);
  } 
  return adjacentCells;
}

