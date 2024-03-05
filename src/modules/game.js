'use strict';
import {
  renderAttack,
  getGridCell,
  displayNumOfShips,
  getAllDOMGameboardCells,
  resetGridRender,
} from '../utilities/dom';
import { Player } from './player';
import { AIPlayer } from './ai-player';
import { createShips } from './ship';
import { renderShips } from '../modules/dom/render-ships';
import { createGameScreen, removeGameScreen } from './dom/screen/game-screen';
import {
  createEndScreen,
  removeEndScreen,
  showEndScreen,
} from './dom/screen/end-screen';
import { removeStartScreen } from './dom/screen/start-screen';

/**
 * Checks if there is a winner by looking at the boards of each player and
 * checking if all of its ships have been sunk
 * @param {object} player - The player object containing ships information.
 * @param {object} computer - The computer object containing ships information.
 * @return {object} Returns the object whose all ships in its gameboard have been
 *                  sunk, or null if all both of them has at least one ship in their
 *                  gameboards.
 */
export function getTheWinner(player, computer) {
  if (player.gameboard.allShipsSunk()) return computer;
  if (computer.gameboard.allShipsSunk()) return player;
  return null;
}

/**
 * Handles the end of the game by removing the game screen, creating the end screen with the winner displayed, and showing the end screen.
 * @param {Player} winner - The winner of the game.
 * @returns {void}
 */
function handleGameOver(winner) {
  removeGameScreen();
  createEndScreen(winner, resetGame);
  showEndScreen();
}

/**
 * Handles an attack on the game board initiated by a player.
 * @param {HTMLElement} cell - The DOM element representing the target cell.
 * @param {Object} player - The player object initiating the attack.
 * @param {Object} computer - The opponent player object.
 */
export function handleAttack(cell, player, computer) {
  let winner = getTheWinner(player, computer);
  if (winner) {
    handleGameOver(winner);
    return;
  }

  let row = parseInt(cell.dataset.row);
  let col = parseInt(cell.dataset.col);
  const attackResult = player.attack(computer, row, col);

  renderAttack(cell, attackResult);

  if (attackResult === 'illegal') return;
  if (attackResult === 'hit') displayNumOfShips(computer);

  computer.attack(player).then((result) => {
    winner = getTheWinner(player, computer);
    if (winner) {
      handleGameOver(winner);
      return;
    }

    const [attackResult, attackedRow, attackedCol] = result;
    const attackedCell = getGridCell('player', attackedRow, attackedCol);

    renderAttack(attackedCell, attackResult);

    if (attackResult === 'hit') displayNumOfShips(player);
  });
}

/**
 * Initializes the game by creating player and computer objects, placing ships randomly,
 * rendering ships, updating ship counts, and adding event listeners for attacks.
 * @returns {void}
 */
export function initializeGame() {
  removeStartScreen();
  createGameScreen();
  let player = new Player('Human Player');
  const playerShips = new createShips();
  let computer = AIPlayer(new Player('Computer'));
  const computerShips = new createShips();
  const computerGridCells = getAllDOMGameboardCells('computer');

  player.placeShipRandomly(playerShips);
  computer.placeShipRandomly(computerShips);
  renderShips('player', player);

  displayNumOfShips(player);
  displayNumOfShips(computer);

  computerGridCells.forEach((cell) =>
    cell.addEventListener('click', attackHandler)
  );

  /**
   * Handles an attack initiated by the player.
   * @param {Event} event - The click event on the game board cell.
   * @returns {void}
   */
  function attackHandler(event) {
    console.log('called');
    const cell = event.target;
    handleAttack(cell, player, computer);
  }
}

/**
 * Resets the game by deleting the current player and computer objects, instantiating new ones,
 * placing ships randomly, rendering ships, updating ship counts, adding event listeners for attacks,
 * and displaying the game screen.
 * @param {Player} player - The player object.
 * @param {Object} computer - The computer object.
 * @returns {void}
 */
function resetGame(player, computer) {
  player = null;
  computer = null;

  player = new Player('Human Player');
  const playerShips = new createShips();
  computer = AIPlayer(new Player('Computer'));
  const computerShips = new createShips();

  removeEndScreen();
  createGameScreen();
  
  player.placeShipRandomly(playerShips);
  computer.placeShipRandomly(computerShips);
  
  resetGridRender('player');
  resetGridRender('computer');
  
  renderShips('player', player);

  displayNumOfShips(player);
  displayNumOfShips(computer);

  const computerGridCells = getAllDOMGameboardCells('computer');
  computerGridCells.forEach((cell) =>
    cell.addEventListener('click', attackHandler)
  );

  /**
   * Handles an attack initiated by the player.
   * @param {Event} event - The click event on the game board cell.
   * @returns {void}
   */
  function attackHandler(event) {
    const cell = event.target;
    handleAttack(cell, player, computer);
  }
}
