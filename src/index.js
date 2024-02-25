import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';
import Ship from './modules/ship'


(function () {
  const ships = {
    carrier: Ship('Carrier', 5),
    battleship: Ship('Battleship', 4),
    cruiser: Ship('Cruiser', 3),
    destroyer: Ship('Destroyer', 2)
  }
  const player = Player();
  const computer = AIPlayer(Player());

  console.log(player);
  console.log(computer);
  console.log(ships);
  let row = 0;
  let col = 0;
  for (let ship in ships) {
    ship = ships[ship]
    player.gameboard.placeShip(ship, row++, col++);
  }
  console.log(player.gameboard.getBoard())




  
  console.log(player);
  console.log(computer);
  console.log(ships);
})();

