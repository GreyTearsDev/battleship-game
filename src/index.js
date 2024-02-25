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
  for (let ship in ships) {
    ship = ships[ship]
    player.gameboard.placeShip(ship, row++, col++);
  }

  row = 0;
  col = 0;
  for (let ship in ships) {
    ship = ships[ship]
    computer.gameboard.placeShip(ship, row++, col++)
  }

  let DOMElements = getShipDOMElements("player", player);

  for (let cell of DOMElements) {
    renderShipGridCell(cell, "ship")
  }
  
  let DOMElements2 = getShipDOMElements("computer", computer);

  for (let cell of DOMElements2) {
    renderShipGridCell(cell, "ship")
  }
  
})();

