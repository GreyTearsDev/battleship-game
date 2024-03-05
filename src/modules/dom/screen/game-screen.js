'use strict';
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
  mainScreen.className = 'screen--game';
  playerScreen.className = 'player';
  playerName.className = 'player__name';
  playerShipDisplayContainer.className = 'ship-display';
  playerBoardContainer.classList.add('player__board', 'player__board--player');
  playerShipDisplayText.className = 'player__ships';

  computerScreen.className = 'computer';
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
      child.className = 'cell';
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
  document.body.querySelector('.screen--game').style.display = 'none';
}

/**
 * Shows the game screen by setting its display style to 'grid'.
 * @returns {void}
 */
export function showGameScreen() {
  document.body.querySelector('.screen--game').style.display = 'grid';
}

/**
 * Removes the game screen element from the document body.
 * @returns {void}
 */
export function removeGameScreen() {
  document.body.querySelector('.screen--game').remove();
}
