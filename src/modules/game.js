'use strict'

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


//TODO:display winner


