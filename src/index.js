import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import { createShips }  from './modules/ship'
import { getAllDOMGameboardCells, getGridCell, renderAttack } from './utilities/dom'
import { renderShipsOnBoard } from './modules/dom/render-ships';
import { getTheWinner, handleAttack } from './modules/game'


const player = new Player("Human Player");
const playerShips = new createShips();
const computer = AIPlayer(new Player("Computer"));
const computerShips = new createShips();

let row = 0;
let col = 0;

// Place the ships on the board
for (let ship in playerShips) {
  player.gameboard.placeShip(playerShips[ship], row++, col++);
}
computer.placeShipRandomly(computerShips)
renderShipsOnBoard("player", player);

let computerGridCells = getAllDOMGameboardCells("computer");  

computerGridCells.forEach((cell) => cell.addEventListener("click", function(event) {
  const cell = event.target;
  handleAttack(cell, player, computer)
}));


