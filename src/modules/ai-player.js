'use strict'
import { getAdjacentCells } from '../utilities/get-cells';

/**
 * Represents an AI player in the game.
 * @param {Object} player - The player object representing the AI player.
 * @returns {Object} An object representing an AI player.
 */
export function AIPlayer(player) {
  const gameboard = player.gameboard;
  let adjacentCells = [];

  /**
  * Generates random attack coordinates that have not been used before.
  * @returns {string} A string representing the random attack coordinates.
  */
  const generateRandomAttackCoordinates = () => {
    let coordinates = player.getRandomCoordinates();

    while (player.usedCoordinates.has(coordinates)) {
      coordinates = player.getRandomCoordinates()
    }
    return coordinates;
  }

  /**
   * Attacks the enemy player's game board strategically.
   * This method utilizes a mix of Breadth-First Search (BFS) and Depth-First Search (DFS) principles.
   * BFS is used to prioritize unexplored areas by selecting adjacent cells to attack.
   * DFS is used to continue the attack until a legal move is made or there are no more cells left to explore.
   * @param {Object} enemyPlayer - The enemy player object.
   * @returns {Promise} A promise that resolves with the attack result and coordinates of the attack.
   */  
  const attack = (enemyPlayer) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let [row, col] = generateRandomAttackCoordinates();
        let attackResult;
        
        if (adjacentCells.length > 0) {
          [row, col] = adjacentCells.pop();
          attackResult = player.attack(enemyPlayer, row, col);

          // continue attacking adjacent cells until a legal attack is made or there are no cells left
          while (attackResult === 'illegal' && adjacentCells.length > 0) {
            [row, col] = adjacentCells.pop();
            attackResult = player.attack(enemyPlayer, row, col);
          }
        } else {
          attackResult = player.attack(enemyPlayer, row, col);

          while (attackResult === 'illegal') {
            [row, col] = generateRandomAttackCoordinates();
            attackResult = player.attack(enemyPlayer, row, col);
          }
        }
        
        // if the attack is a hit, find adjacent cells to continue the attack
        if (attackResult === 'hit') {
          getAdjacentCells(enemyPlayer, row, col).forEach((coordinates) => {
           adjacentCells.push(coordinates); 
          });
        }
        
        player.usedCoordinates.add(`${row},${col}`);
        resolve([attackResult, row, col]);
      }, 250);
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

