import './styles.css';
import { initializeGame } from './modules/game';
import { createStartScreen } from './modules/dom/screen/start-screen';

createStartScreen(initializeGame);
