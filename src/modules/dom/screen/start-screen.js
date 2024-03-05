'use strict';
/**
 * Creates and displays the start screen for the game, allowing the user to start the game.
 * @param {Function} eventHandler - The event handler function to be called when the start button is clicked.
 * @returns {void}
 */
export function createStartScreen(eventHandler) {
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

/**
 * Displays the start screen by setting its display style to 'flex'.
 * @returns {void}
 */
export function showStartScreen() {
  document.body.querySelector('.screen--start').style.display = 'flex';
}

/**
 * Hides the start screen by setting its display style to 'none'.
 * @returns {void}
 */
export function hideStartScreen() {
  document.body.querySelector('.screen--start').style.display = 'none';
}

/**
 * Removes the start screen from the DOM.
 * @returns {void}
 */
export function removeStartScreen() {
  document.body.querySelector('.screen--start').remove();
}
