import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import Ship from './modules/ship'
import { getShipDOMElements } from './utilities/dom-grid'
import { renderShipGridCell } from './modules/dom/render-ships';

(function () {
  const ships = {
    carrier: Ship('Carrier', 5),
    battleship: Ship('Battleship', 4),
    cruiser: Ship('Cruiser', 3),
    destroyer: Ship('Destroyer', 2)
  }
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

  // Render the ships on the board
  let playerDOMElements = getShipDOMElements("player", player);
  let computerDOMElements = getShipDOMElements("computer", computer);
  
  playerDOMElements.forEach((cell) => renderShipGridCell(cell, "ship"))
  computerDOMElements.forEach((cell) => renderShipGridCell(cell, "ship"))

  console.log(player.gameboard.getBoard())
  console.log(computer.gameboard.getBoard())
  
})();

