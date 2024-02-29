'use strict'
import getRandomInt from '../utilities/random-int'

/**
 * Represents an AI player in the game.
 * @param {Object} player - The player object representing the AI player.
 * @returns {Object} An object representing an AI player.
 */
export function AIPlayer(player) {
  const gameboard = player.gameboard;
   
   /**
   * Attacks the enemy player's game board with random coordinates.
   * @param {Object} enemyPlayer - The enemy player object.
   */
  const attack = (enemyPlayer) => {
    return new Promise((resolve, reject) => {
      let coordinates = player.getRandomCoordinates().join("");

      while (player.usedCoordinates.has(coordinates)) {
        coordinates = player.getRandomCoordinates().join("");
      }
    
      let row = coordinates[0];
      let col = coordinates[1];
      
      setTimeout(() => {
        const attackResult = player.attack(enemyPlayer, row, col);
        player.usedCoordinates.add(coordinates);
        resolve([attackResult, row, col]);
      }, 150);
    });
  }

  /**
   * Randomly places ships on the game board.
   * @param {Object[]} ships - An array of ship objects to be placed on the board.
   */
  const placeShipRandomly = (ships) => {
    let [row, col] = player.getRandomCoordinates();
      
    for (let ship in ships) {
      ship = ships[ship]
      // Continue until legal position on the ship is found
      while (!gameboard.isLegal(ship, row, col)) {
        // Randomly change the orientation of the ship
        if (Math.random() >= 0.5) ship.switchOrientation();
        // Get new random coordinates
        [row, col] = player.getRandomCoordinates();
      }
      player.gameboard.placeShip(ship, row, col)
    }
  };

  const getName = () => player.getName();
  return {
    gameboard,
    attack,
    placeShipRandomly,
    getName
  }
}
