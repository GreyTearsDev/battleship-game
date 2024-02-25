'use strict'

/**
 * Renders a ship grid cell by adding a specified CSS class to its classList.
 * @param {HTMLElement} cell - The DOM element representing a ship grid cell.
 * @param {string} CSSclass - The CSS class to be added to the cell's classList.
 */
export function renderShipGridCell(cell, CSSclass) {
  cell.classList.add(`${CSSclass}`);
}
