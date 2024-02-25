'use strict'


/**
 * Retrieves a DOM element within a grid-like structure based on specified row and column attributes.
 * @param {string|number} row - The value of the `data-row` attribute of the desired grid cell.
 * @param {string|number} col - The value of the `data-col` attribute of the desired grid cell.
 * @returns {Element|null} The DOM element that matches the specified row and column attributes within the grid structure, or `null` if no matching element is found.
*/
export default function getGridCell(row, col) {
  return document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
}
