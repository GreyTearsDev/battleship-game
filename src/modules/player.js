'use strict'
 import Gameboard from '../modules/board';

/**
 * Represents a player in the game.
 * @constructor
 * @param {string} playerName - The name of the player. 
 * @returns {Object} An object representing a player.
 */
export function Player(playerName) {
  const gameboard = Gameboard();
  const name = playerName;
  const usedCoordinates = new Set();

  /**
   * Attacks the enemy player's game board at the specified row and column.
   * @param {Object} enemyPlayer - The enemy player object.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   * @return {boolean} True if the attack is successful, false otherwise.
   */
   const attack = (enemyPlayer, row, col) => {
     const coordinates = `${row},${col}`;
     if (usedCoordinates.has(coordinates)) return "illegal";
     const attackResult = enemyPlayer.gameboard.receiveAttack(row, col);

     usedCoordinates.add(coordinates);
     return attackResult ? "hit" : "miss";
   };

   /**
   * Returns the name of the player.
   * @return {string} name - The name of the player.
   */
   const getName = () => name;  

   return {
    gameboard,
    usedCoordinates,
    attack,
    getName,
   }
}
