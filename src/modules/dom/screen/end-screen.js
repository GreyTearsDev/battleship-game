'use strict';

/**
 * Displays the winner of the game along with a restart button.
 * @param {Player} winner - The winner of the game.
 * @returns {void}
 */
export function createEndScreen(winner, eventHandler) {
  const screen = document.createElement('div');
  const message = document.createElement('p');
  const restartBtn = document.createElement('button');

  message.textContent = `${winner.getName()} won the game!`;
  restartBtn.textContent = 'Play again!';
  restartBtn.addEventListener('click', eventHandler);
  screen.classList.add('screen', 'screen--end');
  screen.appendChild(message);
  screen.appendChild(restartBtn);
  document.body.appendChild(screen);
}

/**
 * Displays the end screen by setting its display style to 'flex'.
 * @returns {void}
 */
export function showEndScreen() {
  document.body.querySelector('.screen--end').style.display = 'flex';
}

/**
 * Hides the end screen by setting its display style to 'none'.
 * @returns {void}
 */
export function hideEndScreen() {
  document.body.querySelector('.screen--end').style.display = 'none';
}

/**
 * Removes the end screen from the DOM.
 * @returns {void}
 */
export function removeEndScreen() {
  const screen = document.body.querySelector('.screen--end');
  document.body.remove(screen);
}
