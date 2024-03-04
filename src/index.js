import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import { createShips }  from './modules/ship'
import { getAllDOMGameboardCells } from './utilities/dom'
import { renderShips } from './modules/dom/render-ships';
import { getTheWinner, handleAttack } from './modules/game'

const player = new Player("Human Player");
const playerShips = new createShips();
const computer = AIPlayer(new Player("Computer"));
const computerShips = new createShips();
const computerGridCells = getAllDOMGameboardCells("computer");  


player.placeShipRandomly(playerShips)
computer.placeShipRandomly(computerShips);
renderShips("player", player);

computerGridCells.forEach((cell) => cell.addEventListener("click", attackHandler));

function attackHandler(event) {
  const cell = event.target;
  handleAttack(cell, player, computer)
  let winner = getTheWinner(player, computer);
  if (winner) console.log(winner.getName())
}
