'use strict'
 import Gameboard from '../modules/board';
import getRandomInt from '../utilities/random-int';

/**
 * Represents a player in the game.
 * @constructor
 * @param {string} playerName - The name of the player. 
 * @returns {Object} An object representing a player.
 */
export function Player(playerName) {
  const gameboard = new Gameboard();
  const name = playerName;
  const usedCoordinates = new Set();

  /**
   * Attacks the enemy player's game board at the specified row and column.
   * If the attack is successful, marks the coordinates as used and returns "hit".
   * If the attack is unsuccessful or if the coordinates are already used, returns "miss".
   * @param {Object} enemyPlayer - The enemy player object.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   * @return {string} "hit" if the attack is successful, "miss" if unsuccessful or coordinates are already used, "illegal" if the attack is not allowed.
   */
  function attack(enemyPlayer, row, col) {
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
 
  /**
   * Generates random attack coordinates.
   * @returns {Array} An array containing the row and column indices of the attack.
   */
  const getRandomCoordinates = () => {
    let coordinates = [];
    coordinates.push(getRandomInt(10));
    coordinates.push(getRandomInt(10));
    return coordinates;
  } 

  /**
   * Randomly places ships on the game board.
   * @param {Object[]} ships - An array of ship objects to be placed on the board.
   */
  const placeShipRandomly = (ships) => {
    let [row, col] = getRandomCoordinates();
      
    for (let ship in ships) {
      ship = ships[ship]

      while (!gameboard.isLegal(ship, row, col)) {
        if (Math.random() >= 0.5) ship.switchOrientation();
        [row, col] = getRandomCoordinates();
      }
      gameboard.placeShip(ship, row, col)
    }
  };

   return {
    gameboard,
    usedCoordinates,
    attack,
    getName,
    placeShipRandomly,
    getRandomCoordinates
   }
}
