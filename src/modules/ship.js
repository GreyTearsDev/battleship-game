'use strict'

let createShip = () => {
  let ship = [];
  let damage = 0;
  
  const hitCount = () => damage;
  const hit = () => ++damage;      
  const setLength = (len) => ship.length = len;
  const getLength = () => ship.length;
  const isSunk = () => hitCount() >= getLength() ? true : false;
  
  return {
    setLength,
    getLength,
    hit,
    hitCount,
    isSunk,
  }
}

module.exports = createShip;
