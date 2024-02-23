'use strict'
import getRandomInt from '../utilities/random-int'

/**
 * Represents an AI player in the game.
 * @param {Object} player - The player object representing the AI player.
 * @returns {Object} An object representing an AI player.
 */
export function AIPlayer(player) {
  /**
   * The game board of the AI player.
   * @type {Object}
   */
  const gameboard = player.gameboard;
  
  /**
   * Generates random attack coordinates.
   * @returns {Array} An array containing the row and column indices of the attack.
   */
  const getAttackCoordinates = () => {
    let coordinates = [];
    coordinates.push(getRandomInt(10));
    coordinates.push(getRandomInt(10));
    return coordinates;
  } 
  
   /**
   * Attacks the enemy player's game board with random coordinates.
   * @param {Object} enemyPlayer - The enemy player object.
   * @returns {boolean} True if the attack was successful, false if the coordinates were already used.
   */
  const attack = (enemyPlayer) => {
    let coordinates = getAttackCoordinates();

    if (!player.usedCoordinates.has(coordinates)) {
      let [row, col] = coordinates;
      player.attack(enemyPlayer, row, col);
      player.usedCoordinates.add(coordinates);
      return true;
    }
    return false;
  }

  return {
    gameboard,
    attack,
  }
}
