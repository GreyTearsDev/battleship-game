import './styles.css';
import { Player } from './modules/player';
import { AIPlayer } from './modules/ai-player';

console.log('olºaaaaaaa');
(function () {
  const player = Player();
  const computer = AIPlayer(Player());
  console.log(player);
  console.log(computer);
})();
