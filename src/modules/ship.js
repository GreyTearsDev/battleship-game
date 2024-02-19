'use strict';

/**
 * Creates a ship object with methods to manage its properties and state.
 * @returns {Object} A ship object with methods for setting length, getting length,
 *                   recording hits, counting hits, and determining if the ship is sunk.
 */
let createShip = () => {
  let ship = [];
  let damage = 0;

  /**
   * Sets the length of the ship.
   * @param {number} len - The length of the ship.
   */
  const setLength = (len) => (ship.length = len);

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

  // expose public mthods
  return {
    setLength,
    getLength,
    hit,
    hitCount,
    isSunk,
  };
};

module.exports = createShip;
