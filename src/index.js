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
})();

