'use strict'
import { setClass, getShipDOMElements } from "../../utilities/dom";

/**
 * Renders the ships on the game board for both the player and the computer.
 * This function retrieves DOM elements representing the ships for each player,
 * applies the "ship" CSS class to each element, and renders them on the board.
 * @param {object} player - The player object containing ship information.
 * @param {object} computer - The computer object containing ship information.
 */
export function renderShipsOnBoard(player, computer) {
  // Render the ships on the board
  let playerDOMElements = getShipDOMElements("player", player);
  let computerDOMElements = getShipDOMElements("computer", computer);
  
  playerDOMElements.forEach((cell) => setClass(cell, "ship"))
  computerDOMElements.forEach((cell) => setClass(cell, "ship"))
}
