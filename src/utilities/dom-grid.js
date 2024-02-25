'use strict'


/**
 * Retrieves a DOM element within a grid-like structure based on specified row and column attributes.
 * @param {string|number} row - The value of the `data-row` attribute of the desired grid cell.
 * @param {string|number} col - The value of the `data-col` attribute of the desired grid cell.
 * @returns {Element|null} The DOM element that matches the specified row and column attributes within the grid structure, or `null` if no matching element is found.
*/
export function getGridCell(row, col) {
  return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}

/**
 * Retrieves DOM elements representing ships on the gameboard for a given player.
 * @param {Player} player - The player whose gameboard's ship DOM elements are to be retrieved.
 * @returns {Element[]} An array of DOM elements representing the ships on the player's gameboard.
 */
export function getShipDOMElements(player) {
  let shipDOMElements = []
  const shipsCoordinates = player.gameboard.shipCoordinates;

  for (let coordinate of shipsCoordinates) {
    let [row, col] = coordinate.split(',');
    shipDOMElements.push(getGridCell(row, col));
  }

  return shipDOMElements;
}
