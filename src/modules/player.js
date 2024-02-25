'use strict'
 import Gameboard from '../modules/board';

/**
 * Represents a player in the game.
 * @constructor
 * @returns {Object} An object representing a player.
 */
export function Player() {
  /**
   * The game board of the player.
   * @type {Object}
   */
  const gameboard = Gameboard();

  const usedCoordinates = new Set();
   /**
   * Attacks the enemy player's game board at the specified row and column.
   * @param {Object} enemyPlayer - The enemy player object.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   */
   const attack = (enemyPlayer, row, col) => {
     enemyPlayer.gameboard.receiveAttack(row, col)
   };

   return {
    gameboard,
    usedCoordinates,
    attack,
   }
}
