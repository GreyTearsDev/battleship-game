import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import Ship from './modules/ship'
import { getShipDOMElements, getAllDOMGameboardCells } from './utilities/dom'
import { renderShipsOnBoard } from './modules/dom/render-ships';

(function () {
  const ships = {
    carrier: Ship('Carrier', 5),
    battleship: Ship('Battleship', 4),
    cruiser: Ship('Cruiser', 3),
    destroyer: Ship('Destroyer', 2)
  };
  const player = Player();
  const computer = AIPlayer(Player());

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
      player.attack(computer, row, col);

      setTimeout(() => {
        computer.attack(player)
      }, 200);

      if (player.gameboard.allShipsSunk() || computer.gameboard.allShipsSunk()) {
        // show winner
        if (player.gameboard.allShipsSunk) {
          console.log("You've won");
        } else {
          console.log("computer won")
        }
        console.log("someone died")
      }
    });
  })
})();

