'use strict'
import { setClass, getShipDOMElements } from "../../utilities/dom";

/**
 * Rends the ships on the game board for both the player and the computer.
 * This function retrieves DOM elements representing the ships for each player,
 * applies the "ship" CSS class to each element, and renders them on the board.
 * @param {object} player - The player object containing ship information.
 * @param {object} computer - The computer object containing ship information.
 */
export function renderShipsOnBoard(playerID, playerObject) {
  let DOMElements = getShipDOMElements(playerID, playerObject);
  DOMElements.forEach((cell) => setClass(cell, "ship"))
}
