'use strict'
import getRandomInt from '../utilities/random-int'

export function AIPlayer(player) {
  const gameboard = player.gameboard;
  
  const getAttackCoordinates = () => {
    let coordinates = [];
    coordinates.push(getRandomInt(10));
    coordinates.push(getRandomInt(10));
    return coordinates;
  } 
  
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
