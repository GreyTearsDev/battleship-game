'use strict'

/**
 * Generates a random integer between 0 (inclusive) and the specified maximum value (exclusive).
 * @param {number} max - The maximum value for the generated random integer.
 * @returns {number} A random integer between 0 and (max - 1).
 */
export default function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
