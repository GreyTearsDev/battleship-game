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
    let [row, col] = coordinate;
    shipDOMElements.push(getGridCell(playerID, row, col));
  }

  return shipDOMElements;
}


/**
 * Retrieves all DOM elements representing gameboard cells associated with a specific player.
 * These cells are identified by the specified playerID attribute.
 * @param {string} playerID - The ID of the player whose gameboard cells are to be retrieved.
 * @returns {NodeList} A NodeList containing all DOM elements that match the specified playerID attribute.
 */
export function getAllDOMGameboardCells(playerID) {
  return document.querySelectorAll(`[data-playerID="${playerID}"]`);
}

/**
 * Adds a CSS class to a specified HTML element.
 * @param {Element} element - The HTML element to which the class will be added.
 * @param {string} className - The name of the CSS class to be added.
 */
export function setClass(element, className) {
  element.classList.add(className);
}

/**
 * Renders the result of an attack on a game board cell.
 * Depending on the attack result, applies a corresponding CSS class to the cell.
 * @param {HTMLElement} cell - The DOM element representing the game board cell.
 * @param {string} attackResult - The result of the attack: "hit" for a successful hit, "miss" for a miss, "illegal" if the attack is illegal.
 */ 
export function renderAttack(cell, attackResult) {
  switch (attackResult) {
    case 'illegal':
      return;
    case 'hit':
      setClass(cell, 'shot--hit');
      break;
    case 'miss':
      setClass(cell, 'shot--miss');
      break;
  }
}

export function displayNumOfShips(player) {
  const humanPlayerShipsDisplay = document.body.querySelector('.player__ships');
  const computerShipsDisplay = document.body.querySelector('.computer__ships');
  let shipsNum = player.gameboard.getShipsLeft();

  if (player.getName() === "Human Player") {
    humanPlayerShipsDisplay.textContent = `Ships left: ${shipsNum}`;
  } else {
    computerShipsDisplay.textContent = `Ships left: ${shipsNum}`;
  }
}



