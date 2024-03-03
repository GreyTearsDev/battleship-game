'use strict'
import { renderAttack, getGridCell } from "../utilities/dom";
/**
  * Checks if there is a winner by looking at the boards of each player and
  * checking if all of its ships have been sunk
  * @param {object} player - The player object containing ships information.
  * @param {object} computer - The computer object containing ships information.
  * @return {object} Returns the object whose all ships in its gameboard have been 
  *                  sunk, or null if all both of them has at least one ship in their
  *                  gameboards.
 */
export function getTheWinner(player, computer) {
  if (player.gameboard.allShipsSunk()) return computer;
  if (computer.gameboard.allShipsSunk()) return player;
  return null;
}

/**
 * Handles an attack on the game board initiated by a player.
 * @param {HTMLElement} cell - The DOM element representing the target cell.
 * @param {Object} player - The player object initiating the attack.
 * @param {Object} computer - The opponent player object.
 */
export function handleAttack(cell, player, computer){
  let row = parseInt(cell.dataset.row);
  let col = parseInt(cell.dataset.col);  
  const attackResult = player.attack(computer, row, col);

  renderAttack(cell, attackResult);

  if (attackResult === "illegal") return;

  computer.attack(player).then((result) => {
    const [attackResult, attackedRow, attackedCol] = result;
    const attackedCell = getGridCell("player", attackedRow, attackedCol);
    renderAttack(attackedCell, attackResult);
  });
}
