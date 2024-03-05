'use strict';

/**
 * Retrieves a DOM element within a grid-like structure based on specified row and column attributes.
 * @param {string|number} playerID - The ID of the player associated with the grid.
 * @param {string|number} row - The value of the `data-row` attribute of the desired grid cell.
 * @param {string|number} col - The value of the `data-col` attribute of the desired grid cell.
 * @returns {Element|null} The DOM element that matches the specified row and column attributes within the grid structure, or `null` if no matching element is found.
 */
export function getGridCell(playerID, row, col) {
  return document.querySelector(
    `[data-playerID="${playerID}"][data-row="${row}"][data-col="${col}"]`
  );
}

/**
 * Retrieves DOM elements representing ships on the gameboard for a given player.
 * @param {string} playerID - The ID of the player whose gameboard's ship DOM elements are to be retrieved.
 * @param {Player} player - The player whose gameboard's ship DOM elements are to be retrieved.
 * @returns {Element[]} An array of DOM elements representing the ships on the player's gameboard.
 */
export function getShipDOMElements(playerID, player) {
  let shipDOMElements = [];
  const shipsCoordinates = player.gameboard.shipsCoordinates;
  for (let coordinate of shipsCoordinates) {
    let [row, col] = coordinate;
    shipDOMElements.push(getGridCell(playerID, row, col));
  }

  return shipDOMElements;
}

/**
 * Retrieves all DOM elements representing gameboard cells associated with a specific player.
 * These cells are identified by the specified playerID attribute.
 * @param {string} playerID - The ID of the player whose gameboard cells are to be retrieved.
 * @returns {NodeList} A NodeList containing all DOM elements that match the specified playerID attribute.
 */
export function getAllDOMGameboardCells(playerID) {
  return document.querySelectorAll(`[data-playerID="${playerID}"]`);
}

/**
 * Adds a CSS class to a specified HTML element.
 * @param {Element} element - The HTML element to which the class will be added.
 * @param {string} className - The name of the CSS class to be added.
 */
export function setClass(element, className) {
  element.classList.add(className);
}

export function removeClass(element) {
  element.className = '';
}

export function resetGridRender(playerID) {
  const cells = getAllDOMGameboardCells(playerID);
  cells.forEach((cell) => cell.classList.remove('shot--hit', 'shot--miss'));
}

/**
 * Renders the result of an attack on a game board cell.
 * Depending on the attack result, applies a corresponding CSS class to the cell.
 * @param {HTMLElement} cell - The DOM element representing the game board cell.
 * @param {string} attackResult - The result of the attack: "hit" for a successful hit, "miss" for a miss, "illegal" if the attack is illegal.
 */
export function renderAttack(cell, attackResult) {
  switch (attackResult) {
    case 'illegal':
      return;
    case 'hit':
      setClass(cell, 'shot--hit');
      break;
    case 'miss':
      setClass(cell, 'shot--miss');
      break;
  }
}

/**
 * Displays the number of ships left for a given player.
 * @param {Player} player - The player whose ship count is to be displayed.
 * @returns {void}
 */
export function displayNumOfShips(player) {
  const humanPlayerShipsDisplay = document.body.querySelector('.player__ships');
  const computerShipsDisplay = document.body.querySelector('.computer__ships');
  let shipsNum = player.gameboard.getShipsLeft();

  if (player.getName() === 'Human Player') {
    humanPlayerShipsDisplay.textContent = `Ships left: ${shipsNum}`;
  } else {
    computerShipsDisplay.textContent = `Ships left: ${shipsNum}`;
  }
}

/**
 * Displays the winner of the game along with a restart button.
 * @param {Player} winner - The winner of the game.
 * @returns {void}
 */
export function displayWinner(winner, eventHandler) {
  const screen = document.createElement('div');
  const message = document.createElement('p');
  const restartBtn = document.createElement('button');

  document.body.querySelector('.game-screen').style.display = 'none';
  message.textContent = `${winner.getName()} won the game!`;
  restartBtn.textContent = 'Play again!';
  restartBtn.addEventListener('click', eventHandler);
  screen.classList.add('screen', 'screen--end');
  screen.appendChild(message);
  screen.appendChild(restartBtn);
  document.body.appendChild(screen);
}

/**
 * Displays the start screen for the game, allowing the user to start the game.
 * @param {Function} eventHandler - The event handler function to be called when the start button is clicked.
 * @returns {void}
 */
export function displayStartScreen(eventHandler) {
  const screen = document.createElement('div');
  const message = document.createElement('p');
  const startBtn = document.createElement('button');

  message.textContent = 'BATTLESHIP';
  startBtn.textContent = 'Start Game';
  startBtn.addEventListener('click', eventHandler);
  screen.classList.add('screen', 'screen--start');
  screen.appendChild(message);
  screen.appendChild(startBtn);
  document.body.appendChild(screen);
}

export function hideStartScreen() {}

/**
 * Creates the game screen containing player and computer boards along with ship displays.
 * @returns {void}
 */
export function createGameScreen() {
  const mainScreen = document.createElement('div');
  const playerScreen = document.createElement('div');
  const playerName = document.createElement('p');
  const playerShipDisplayContainer = document.createElement('div');
  const playerBoardContainer = document.createElement('div');
  const playerShipDisplayText = document.createElement('p');

  const computerScreen = document.createElement('div');
  const computerName = document.createElement('p');
  const computerShipDisplayContainer = document.createElement('div');
  const computerBoardContainer = document.createElement('div');
  const computerShipDisplayText = document.createElement('p');

  // Set class names for elements
  mainScreen.className = 'game-screen';
  playerScreen.className = 'player';
  playerName.className = 'player__name';
  playerShipDisplayContainer.className = 'ship-display';
  playerBoardContainer.classList.add('player__board', 'player__board--player');
  playerShipDisplayText.className = 'player__ships';

  computerScreen.className = 'player';
  computerName.className = 'player__name';
  computerShipDisplayContainer.className = 'ship-display';
  computerBoardContainer.classList.add(
    'player__board',
    'player__board--computer'
  );
  computerShipDisplayText.className = 'computer__ships';

  // Set text content for player and computer names
  playerName.textContent = 'Human Player';
  computerName.textContent = 'Computer';

  // Append elements to their respective containers
  playerScreen.appendChild(playerName);
  playerScreen.appendChild(createBoard(playerBoardContainer, 'player'));
  playerScreen.appendChild(
    playerShipDisplayContainer.appendChild(playerShipDisplayText)
  );

  computerScreen.appendChild(computerName);
  computerScreen.appendChild(createBoard(computerBoardContainer, 'computer'));
  computerScreen.appendChild(
    computerShipDisplayContainer.appendChild(computerShipDisplayText)
  );

  // Append player and computer screens to the main screen
  mainScreen.appendChild(playerScreen);
  mainScreen.appendChild(computerScreen);

  // Append the main screen to the document body
  document.body.appendChild(mainScreen);
}

/**
 * Creates a game board by generating grid cells and appending them to the specified parent element.
 * @param {HTMLElement} parent - The parent element to which the grid cells will be appended.
 * @param {string} playerID - The ID of the player for whom the board is being created.
 * @returns {HTMLElement} The parent element with grid cells appended.
 */
function createBoard(parent, playerID) {
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const child = document.createElement('div');
      child.setAttribute('data-row', i);
      child.setAttribute('data-col', j);
      child.setAttribute('data-playerID', playerID);
      parent.appendChild(child);
    }
  }
  return parent;
}

/**
 * Hides the game screen by setting its display style to 'none'.
 * @returns {void}
 */
export function hideGameScreen() {
  document.body.querySelector('.game-screen').style.display = 'none';
}

/**
 * Shows the game screen by setting its display style to 'grid'.
 * @returns {void}
 */
export function showGameScreen() {
  document.body.querySelector('.game-screen').style.display = 'grid';
}

/**
 * Removes the game screen element from the document body.
 * @returns {void}
 */
export function removeGameScreen() {
  const screen = document.body.querySelector('.game-screen');
  document.body.remove(screen);
}
