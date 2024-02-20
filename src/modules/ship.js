'use strict';

/**
 * Creates a ship object with methods to manage its properties and state.
 * @param {string} shipName - The name of the ship.
 * @param {number} length - The length of the ship.
 * @returns {Object} A ship object with methods for setting length, getting length,
 *                   recording hits, counting hits, and determining if the ship is sunk.                                                                                
 */
const Ship = (shipName, length) => {
  let ship = [];
  let damage = 0;
  let name = shipName;

  ship.length = length;
 
  /**
   * Retrieves the length of the ship.
   * @returns {number} The length of the ship.
   */
  const getLength = () => ship.length;

  /**
   * Retrieves the count of hits on the ship.
   * @returns {number} The count of hits on the ship.
   */
  const hitCount = () => damage;

  /**
   * Records a hit on the ship.
   */
  const hit = () => ++damage;

  /**
   * Checks if the ship is sunk.
   * @returns {boolean} True if the number of hits equals or exceeds the ship's length, otherwise false.
   */
  const isSunk = () => (hitCount() >= getLength() ? true : false);

  /**
   * Retrieves the name of the ship.
   * @returns {string} The name of the ship.
   */
  const getName = () => name;

  // expose public mthods
  return {
    getLength,
    hit,
    hitCount,
    isSunk,
    getName
  };
};

module.exports = Ship;
