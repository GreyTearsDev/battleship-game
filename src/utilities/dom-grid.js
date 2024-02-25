'use strict'


/**
 * Retrieves a DOM element within a grid-like structure based on specified row and column attributes.
 * @param {string|number} playerID - The ID of the player associated with the grid.
 * @param {string|number} row - The value of the `data-row` attribute of the desired grid cell.
 * @param {string|number} col - The value of the `data-col` attribute of the desired grid cell.
 * @returns {Element|null} The DOM element that matches the specified row and column attributes within the grid structure, or `null` if no matching element is found.
*/
export function getGridCell(playerID, row, col) {
  return document.querySelector(`[data-playerID="${playerID}"][data-row="${row}"][data-col="${col}"]`);
}

/**
 * Retrieves DOM elements representing ships on the gameboard for a given player.
 * @param {string} playerID - The ID of the player whose gameboard's ship DOM elements are to be retrieved.
 * @param {Player} player - The player whose gameboard's ship DOM elements are to be retrieved.
 * @returns {Element[]} An array of DOM elements representing the ships on the player's gameboard.
 */
export function getShipDOMElements(playerID, player) {
  let shipDOMElements = []
  const shipsCoordinates = player.gameboard.shipsCoordinates;
  for (let coordinate of shipsCoordinates) {
    let [row, col] = coordinate.split(',');
    shipDOMElements.push(getGridCell(playerID, row, col));
  }

  return shipDOMElements;
}
