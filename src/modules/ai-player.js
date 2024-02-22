'use strict'
import { Player } from "./player"
import getRandomInt from '../utilities/random-int'

export function AIPlayer() {
  const player = Player();

  const getAttackCoordinates = () => {
    let coordinates = [];
    coordinates.push(getRandomInt(10));
    coordinates.push(getRandomInt(10));
    return coordinates;
  } 
  
}
