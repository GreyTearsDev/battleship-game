import './styles.css';
import { initializeGame } from './modules/game'
import { displayStartScreen } from './utilities/dom';

displayStartScreen(initializeGame);
