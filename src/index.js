import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import { createShips }  from './modules/ship'
import { getAllDOMGameboardCells, getGridCell, renderAttack } from './utilities/dom'
import { renderShipsOnBoard } from './modules/dom/render-ships';
import { getTheWinner } from './modules/game'


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

computerGridCells.forEach((cell) => {
  cell.addEventListener("click", function(){
    let row = cell.dataset.row;
    let col = cell.dataset.col;  
    const attackResult = player.attack(computer, row, col);

    renderAttack(cell, attackResult);
  
    if (attackResult === "illegal") return;
 
    computer.attack(player).then((result) => {
      const [attackResult, attackedRow, attackedCol] = result;
      const attackedCell = getGridCell("player", attackedRow, attackedCol);
      renderAttack(attackedCell, attackResult);
  });

              
  const WINNER = getTheWinner(player, computer);
  if (WINNER !== null) {
    console.log(WINNER.getName(), "won")
  } 
  });
})
