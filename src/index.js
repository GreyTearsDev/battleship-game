import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import Ship from './modules/ship'
import { getAllDOMGameboardCells, getGridCell, renderAttack } from './utilities/dom'
import { renderShipsOnBoard } from './modules/dom/render-ships';
import { getTheWinner } from './modules/game'


  const ships = {
    carrier: new Ship('Carrier', 5),
    battleship: new Ship('Battleship', 4),
    cruiser: new Ship('Cruiser', 3),
    destroyer: new Ship('Destroyer', 2)
  };
  const player = new Player("Human Player");
  const computer = AIPlayer(new Player("Computer"));

  let row = 0;
  let col = 0;
  
  // Place the ships on the board
  for (let ship in ships) {
    ship = ships[ship]
    player.gameboard.placeShip(ship, row++, col++);
  }
  computer.placeShipRandomly(ships)
  renderShipsOnBoard(player, computer);

  let computerGridCells = getAllDOMGameboardCells("computer");  

  computerGridCells.forEach((cell) => {
    cell.addEventListener("click", function(){
      let row = cell.dataset.row;
      let col = cell.dataset.col;
      
      const attackResult = player.attack(computer, row, col);
      renderAttack(cell, attackResult);

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
