'use strict'
import { 
  renderAttack, 
  getGridCell, 
  displayNumOfShips, 
  displayWinner, 
  getAllDOMGameboardCells, 
  resetGridRender
} from "../utilities/dom";
import { Player } from './player'
import { AIPlayer } from './ai-player';
import { createShips }  from './ship'
import { renderShips } from '../modules/dom/render-ships'


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

function handleVictory(winner) {
  displayWinner(winner, resetGame);
}

/**
 * Handles an attack on the game board initiated by a player.
 * @param {HTMLElement} cell - The DOM element representing the target cell.
 * @param {Object} player - The player object initiating the attack.
 * @param {Object} computer - The opponent player object.
 */
export function handleAttack(cell, player, computer){
  let winner = getTheWinner(player, computer)
  if (winner) {
    handleVictory(winner);
    return;
  }
    
  let row = parseInt(cell.dataset.row);
  let col = parseInt(cell.dataset.col);  
  const attackResult = player.attack(computer, row, col);
  
  renderAttack(cell, attackResult);
  
  if (attackResult === 'illegal') return;
  if (attackResult === 'hit') displayNumOfShips(computer);
  
  computer.attack(player).then((result) => {
    winner = getTheWinner(player, computer)
    if (winner) {
      handleVictory(winner);
      return;
    }
  
    const [attackResult, attackedRow, attackedCol] = result;
    const attackedCell = getGridCell("player", attackedRow, attackedCol);
    
    renderAttack(attackedCell, attackResult);
    
    if (attackResult === 'hit') displayNumOfShips(player);
  });
  
}

export function initializeGame() {
  let player = new Player("Human Player");
  const playerShips = new createShips();
  let computer = AIPlayer(new Player("Computer"));
  const computerShips = new createShips();
  const computerGridCells = getAllDOMGameboardCells("computer");  


  player.placeShipRandomly(playerShips)
  computer.placeShipRandomly(computerShips);
  renderShips("player", player);

  displayNumOfShips(player);
  displayNumOfShips(computer);

  computerGridCells.forEach((cell) => cell.addEventListener("click", attackHandler));

  function attackHandler(event) {
    const cell = event.target;
    handleAttack(cell, player, computer)
  }
  document.body.querySelector('.game-screen').style.display = 'grid';
  document.body.querySelector('.screen--start').remove();
}

function resetGame(player, computer) {
  player = null;
  computer = null;
 
  player = new Player("Human Player");
  const playerShips = new createShips();
  computer = AIPlayer(new Player("Computer"));
  const computerShips = new createShips();

  player.placeShipRandomly(playerShips)
  computer.placeShipRandomly(computerShips);
  resetGridRender("player");
  resetGridRender("computer");

  displayNumOfShips(player);
  displayNumOfShips(computer);

  const computerGridCells = getAllDOMGameboardCells("computer");  
  computerGridCells.forEach((cell) => cell.addEventListener("click", attackHandler));

  function attackHandler(event) {
    const cell = event.target;
    handleAttack(cell, player, computer)
  }
  document.body.querySelector('.game-screen').style.display = 'grid';
  document.body.querySelector('.screen--end').remove();
}

