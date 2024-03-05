/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/utilities/dom.js


/**
 * Retrieves a DOM element within a grid-like structure based on specified row and column attributes.
 * @param {string|number} playerID - The ID of the player associated with the grid.
 * @param {string|number} row - The value of the `data-row` attribute of the desired grid cell.
 * @param {string|number} col - The value of the `data-col` attribute of the desired grid cell.
 * @returns {Element|null} The DOM element that matches the specified row and column attributes within the grid structure, or `null` if no matching element is found.
 */
function getGridCell(playerID, row, col) {
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
function getShipDOMElements(playerID, player) {
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
function getAllDOMGameboardCells(playerID) {
  return document.querySelectorAll(`[data-playerID="${playerID}"]`);
}

/**
 * Adds a CSS class to a specified HTML element.
 * @param {Element} element - The HTML element to which the class will be added.
 * @param {string} className - The name of the CSS class to be added.
 */
function setClass(element, className) {
  element.classList.add(className);
}

function removeClass(element) {
  element.className = '';
}

function resetGridRender(playerID) {
  const cells = getAllDOMGameboardCells(playerID);
  cells.forEach((cell) => cell.classList.remove('shot--hit', 'shot--miss'));
}

/**
 * Renders the result of an attack on a game board cell.
 * Depending on the attack result, applies a corresponding CSS class to the cell.
 * @param {HTMLElement} cell - The DOM element representing the game board cell.
 * @param {string} attackResult - The result of the attack: "hit" for a successful hit, "miss" for a miss, "illegal" if the attack is illegal.
 */
function renderAttack(cell, attackResult) {
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
function displayNumOfShips(player) {
  const humanPlayerShipsDisplay = document.body.querySelector('.player__ships');
  const computerShipsDisplay = document.body.querySelector('.computer__ships');
  let shipsNum = player.gameboard.getShipsLeft();

  if (player.getName() === 'Human Player') {
    humanPlayerShipsDisplay.textContent = `Ships left: ${shipsNum}`;
  } else {
    computerShipsDisplay.textContent = `Ships left: ${shipsNum}`;
  }
}

;// CONCATENATED MODULE: ./src/modules/board.js


function GameBoard() {
  const boardSize = 10; 
  const board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
  const missedShots = new Set();
  const ships = [];
  const shipsCoordinates = [];
  let shipsLeft = 4;
  
  /**
   * Places a ship on the game board at the specified row and column.
   * @param {Object} ship - The ship object to be placed on the board.
   * @param {number} row - The row index where the ship will be placed.
   * @param {number} col - The column index where the ship will be placed.
   */
  const placeShip = (ship, row, col) => {
    // check if provided coordinates are legal
    if (!isLegal(ship, row, col)) return false;

    for (let i = 0; i < ship.getLength(); i++) {
      if (ship.getOrientation() === "horizontal") {
        shipsCoordinates.push([row, col])
        board[row][col++] = ship.getLength();
      } else {
        shipsCoordinates.push([row, col])
        board[row++][col] = ship.getLength();
      }
    }
    ships.push(ship);
    return true;
  }

  /**
   * Retrieves the current state of the game board.
   * @returns {Array} The current game board.
   */
  const getBoard = () => board;

  /**
   * Checks if placing a ship at the specified row and column is legal.
   * @param {Object} ship - The ship object to be placed on the board.
   * @param {number} row - The row index to check for legality.
   * @param {number} col - The column index to check for legality.
   * @returns {boolean} True if placing the ship is legal, otherwise false.
   */
  const isLegal = (ship, row, col) => {
    if (ship.getOrientation() === "horizontal") {
      // Check if there is enough space horizontally to place the ship
      if (!(ship.getLength() + col <= board[row].length)) return false;
  
      for (let i = 0; i < ship.getLength(); i++) {
        // Check if the coordinates in the path aren't already occupied
        if (board[row][col++] !== 0) return false;
      }
      return true;
    } 
    
    if (ship.getOrientation() === "vertical") {
      // Check if there is enough space vertically to place the ship
      if (!(ship.getLength() + row <= board.length)) return false;
  
      for (let i = 0; i < ship.getLength(); i++) {
        // Check if the coordinates in the path aren't already occupied
        if (board[row++][col] !== 0) return false;
      }
      return true;
    } 
  }
  

  /**
   * Handles receiving an attack on the game board.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   * @returns {boolean} - True if the attack hits a ship, false otherwise.
   */
  const receiveAttack = (row, col) => {
    if (board[row][col] === 0) {
      missedShots.add([row,col]);
      return false;
    }
    
    const shipId = board[row][col];
    for (let ship of ships) {
      let shipIndex = 0;
      if (ship.getLength() === shipId) {
        ship.hit();
        if (ship.isSunk()) {
          shipsLeft--;
        }
      }
      shipIndex++;
    }
    board[row][col] = 0;
    return true;
  }

  /**
   * Retrieves the set of missed shots on the game board.
   * @returns {Set} - The set containing the coordinates of missed shots.
   */

  /**
   * Checks if all ships on the game board are sunk.
   * @returns {boolean} - True if all ships are sunk, false otherwise.
   */
  const allShipsSunk = () => {
    return shipsLeft === 0;
  }

  const getShipsLeft = () => shipsLeft;
  
  return {
    ships,
    placeShip,
    shipsCoordinates,
    getBoard,
    isLegal,
    receiveAttack, 
    getShipsLeft,
    allShipsSunk,
  }
}


;// CONCATENATED MODULE: ./src/utilities/random-int.js


/**
 * Generates a random integer between 0 (inclusive) and the specified maximum value (exclusive).
 * @param {number} max - The maximum value for the generated random integer.
 * @returns {number} A random integer between 0 and (max - 1).
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

;// CONCATENATED MODULE: ./src/modules/player.js

;


/**
 * Represents a player in the game.
 * @constructor
 * @param {string} playerName - The name of the player. 
 * @returns {Object} An object representing a player.
 */
function Player(playerName) {
  const gameboard = new GameBoard();
  const name = playerName;
  const usedCoordinates = new Set();

  /**
   * Attacks the enemy player's game board at the specified row and column.
   * If the attack is successful, marks the coordinates as used and returns "hit".
   * If the attack is unsuccessful or if the coordinates are already used, returns "miss".
   * @param {Object} enemyPlayer - The enemy player object.
   * @param {number} row - The row index of the attack.
   * @param {number} col - The column index of the attack.
   * @return {string} "hit" if the attack is successful, "miss" if unsuccessful or coordinates are already used, "illegal" if the attack is not allowed.
   */
  function attack(enemyPlayer, row, col) {
    const coordinates = `${row},${col}`;
  
    if (usedCoordinates.has(coordinates)) return 'illegal';
    const attackResult = enemyPlayer.gameboard.receiveAttack(row, col);

    usedCoordinates.add(coordinates);
    return attackResult ? 'hit' : 'miss';
   };

   /**
   * Returns the name of the player.
   * @return {string} name - The name of the player.
   */
   const getName = () => name;  
 
  /**
   * Generates random attack coordinates.
   * @returns {Array} An array containing the row and column indices of the attack.
   */
  const getRandomCoordinates = () => {
    let coordinates = [];
    coordinates.push(getRandomInt(10));
    coordinates.push(getRandomInt(10));
    return coordinates;
  } 

  /**
   * Randomly places ships on the game board.
   * @param {Object[]} ships - An array of ship objects to be placed on the board.
   */
  const placeShipRandomly = (ships) => {
    let [row, col] = getRandomCoordinates();
      
    for (let ship in ships) {
      ship = ships[ship]

      while (!gameboard.isLegal(ship, row, col)) {
        if (Math.random() >= 0.5) ship.switchOrientation();
        [row, col] = getRandomCoordinates();
      }
      gameboard.placeShip(ship, row, col)
    }
  };

   return {
    gameboard,
    usedCoordinates,
    attack,
    getName,
    placeShipRandomly,
    getRandomCoordinates
   }
}

;// CONCATENATED MODULE: ./src/utilities/get-cells.js


/**
 * Returns an array of adjacent grid cells that have not been attacked.
 * @param {Object} player - The player object representing the AI player.
 * @param {number} row - The row index of the current cell.
 * @param {number} col - The column index of the current cell.
 * @returns {Array} An array of adjacent grid cells that have not been attacked.
 */
function getAdjacentCells(player, row, col) {
  const board = player.gameboard.getBoard();
  const usedCoordinates = player.usedCoordinates;
  const adjacentCells = [];
  const top = row - 1;
  const bottom = row + 1;
  const left = col - 1;
  const right = col + 1;
  
  if (top >= 0 && !usedCoordinates.has([top, col])) {
    adjacentCells.push([top, col])
  }; 

  if (bottom < board.length && !usedCoordinates.has([bottom, col])) {
    adjacentCells.push([bottom, col]);
  } 

  if (left >= 0 && !usedCoordinates.has([row, left])) {
    adjacentCells.push([row, left]);
  } 

  if (right < board[row].length && !usedCoordinates.has([row, right])) {
    adjacentCells.push([row, right]);
  } 
  return adjacentCells;
}


;// CONCATENATED MODULE: ./src/modules/ai-player.js

;

/**
 * Represents an AI player in the game.
 * @param {Object} player - The player object representing the AI player.
 * @returns {Object} An object representing an AI player.
 */
function AIPlayer(player) {
  const gameboard = player.gameboard;
  let adjacentCells = [];

  /**
  * Generates random attack coordinates that have not been used before.
  * @returns {string} A string representing the random attack coordinates.
  */
  const generateRandomAttackCoordinates = () => {
    let coordinates = player.getRandomCoordinates();

    while (player.usedCoordinates.has(coordinates)) {
      coordinates = player.getRandomCoordinates()
    }
    return coordinates;
  }

  /**
   * Attacks the enemy player's game board strategically.
   * This method utilizes a mix of Breadth-First Search (BFS) and Depth-First Search (DFS) principles.
   * BFS is used to prioritize unexplored areas by selecting adjacent cells to attack.
   * DFS is used to continue the attack until a legal move is made or there are no more cells left to explore.
   * @param {Object} enemyPlayer - The enemy player object.
   * @returns {Promise} A promise that resolves with the attack result and coordinates of the attack.
   */  
  const attack = (enemyPlayer) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let [row, col] = generateRandomAttackCoordinates();
        let attackResult;
        
        if (adjacentCells.length > 0) {
          [row, col] = adjacentCells.pop();
          attackResult = player.attack(enemyPlayer, row, col);

          // continue attacking adjacent cells until a legal attack is made or there are no cells left
          while (attackResult === 'illegal' && adjacentCells.length > 0) {
            [row, col] = adjacentCells.pop();
            attackResult = player.attack(enemyPlayer, row, col);
          }
        } else {
          attackResult = player.attack(enemyPlayer, row, col);

          while (attackResult === 'illegal') {
            [row, col] = generateRandomAttackCoordinates();
            attackResult = player.attack(enemyPlayer, row, col);
          }
        }
        
        // if the attack is a hit, find adjacent cells to continue the attack
        if (attackResult === 'hit') {
          getAdjacentCells(enemyPlayer, row, col).forEach((coordinates) => {
           adjacentCells.push(coordinates); 
          });
        }
        
        player.usedCoordinates.add(`${row},${col}`);
        resolve([attackResult, row, col]);
      }, 250);
    });
  }

  /**
   * Randomly places ships on the game board.
   * @param {Object[]} ships - An array of ship objects to be placed on the board.
   */
  const placeShipRandomly = (ships) => {
    let [row, col] = player.getRandomCoordinates();
      
    for (let ship in ships) {
      ship = ships[ship]
      // Continue until legal position on the ship is found
      while (!gameboard.isLegal(ship, row, col)) {
        // Randomly change the orientation of the ship
        if (Math.random() >= 0.5) ship.switchOrientation();
        // Get new random coordinates
        [row, col] = player.getRandomCoordinates();
      }
      player.gameboard.placeShip(ship, row, col)
    }
  };

  const getName = () => player.getName();
  return {
    gameboard,
    attack,
    placeShipRandomly,
    getName
  }
}


;// CONCATENATED MODULE: ./src/modules/ship.js


/**
 * Creates a ship object with methods to manage its properties and state.
 * @param {string} shipName - The name of the ship.
 * @param {number} length - The length of the ship.
 * @returns {Object} A ship object with methods for setting length, getting length,
 *                   recording hits, counting hits, and determining if the ship is sunk.
 */ 
function Ship(shipName, length) {
  const name = shipName;
  let damage = 0;
  let orientation = false;

   /**
   * switches the orientation of the ship.
   */ 
  const switchOrientation = () => {
    orientation = !orientation;
  } 
   /**
   *
   * Retrieves the orientation of the ship.
   * @returns {string} The orientation of the ship: "vertical" or "horizontal".
   */
  const getOrientation = () => {
    if (orientation) return "vertical";   
    return "horizontal";
 } 

  /**
  * Retrieves the length of the ship.
  * @returns {number} The length of the ship.
  */
  const getLength = () => length;

  /**
   * Retrieves the count of hits on the ship.
   * @returns {number} The count of hits on the ship.
   */
  const hitCount = () => damage;

  /**
   * Records a hit on the ship.
   */
  const hit = () => ++damage;

  /**
   * Checks if the ship is sunk.
   * @returns {boolean} True if the number of hits equals or exceeds the ship's length, otherwise false.
   */
  const isSunk = () => hitCount() >= getLength();

  /**
   * Retrieves the name of the ship.
   * @returns {string} The name of the ship.
   */
  const getName = () => name;

  return {
    switchOrientation,
    getOrientation,
    getLength,
    hit,
    hitCount,
    isSunk,
    getName
  };
};


function createShips() {
  return {    
    carrier: new Ship('Carrier', 5),
    battleship: new Ship('Battleship', 4),
    cruiser: new Ship('Cruiser', 3),
    destroyer: new Ship('Destroyer', 2)
  }
};

;// CONCATENATED MODULE: ./src/modules/dom/render-ships.js

;

/**
 * Rends the ships on the game board for both the player and the computer.
 * This function retrieves DOM elements representing the ships for each player,
 * applies the "ship" CSS class to each element, and renders them on the board.
 * @param {object} player - The player object containing ship information.
 * @param {object} computer - The computer object containing ship information.
 */
function renderShips(playerID, playerObject) {
  let DOMElements = getShipDOMElements(playerID, playerObject);
  DOMElements.forEach((cell) => setClass(cell, "ship"))
}

;// CONCATENATED MODULE: ./src/modules/dom/screen/game-screen.js

/**
 * Creates the game screen containing player and computer boards along with ship displays.
 * @returns {void}
 */
function createGameScreen() {
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
function hideGameScreen() {
  document.body.querySelector('.screen--game').style.display = 'none';
}

/**
 * Shows the game screen by setting its display style to 'grid'.
 * @returns {void}
 */
function showGameScreen() {
  document.body.querySelector('.screen--game').style.display = 'grid';
}

/**
 * Removes the game screen element from the document body.
 * @returns {void}
 */
function removeGameScreen() {
  document.body.querySelector('.screen--game').remove();
}

;// CONCATENATED MODULE: ./src/modules/dom/screen/end-screen.js


/**
 * Displays the winner of the game along with a restart button.
 * @param {Player} winner - The winner of the game.
 * @returns {void}
 */
function createEndScreen(winner, eventHandler) {
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
function showEndScreen() {
  document.body.querySelector('.screen--end').style.display = 'flex';
}

/**
 * Hides the end screen by setting its display style to 'none'.
 * @returns {void}
 */
function hideEndScreen() {
  document.body.querySelector('.screen--end').style.display = 'none';
}

/**
 * Removes the end screen from the DOM.
 * @returns {void}
 */
function removeEndScreen() {
  document.body.querySelector('.screen--end').remove();
}

;// CONCATENATED MODULE: ./src/modules/dom/screen/start-screen.js

/**
 * Creates and displays the start screen for the game, allowing the user to start the game.
 * @param {Function} eventHandler - The event handler function to be called when the start button is clicked.
 * @returns {void}
 */
function createStartScreen(eventHandler) {
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
function showStartScreen() {
  document.body.querySelector('.screen--start').style.display = 'flex';
}

/**
 * Hides the start screen by setting its display style to 'none'.
 * @returns {void}
 */
function hideStartScreen() {
  document.body.querySelector('.screen--start').style.display = 'none';
}

/**
 * Removes the start screen from the DOM.
 * @returns {void}
 */
function removeStartScreen() {
  document.body.querySelector('.screen--start').remove();
}

;// CONCATENATED MODULE: ./src/modules/game.js










/**
 * Checks if there is a winner by looking at the boards of each player and
 * checking if all of its ships have been sunk
 * @param {object} player - The player object containing ships information.
 * @param {object} computer - The computer object containing ships information.
 * @return {object} Returns the object whose all ships in its gameboard have been
 *                  sunk, or null if all both of them has at least one ship in their
 *                  gameboards.
 */
function getTheWinner(player, computer) {
  if (player.gameboard.allShipsSunk()) return computer;
  if (computer.gameboard.allShipsSunk()) return player;
  return null;
}

/**
 * Handles the end of the game by removing the game screen, creating the end screen with the winner displayed, and showing the end screen.
 * @param {Player} winner - The winner of the game.
 * @returns {void}
 */
function handleGameOver(winner) {
  removeGameScreen();
  createEndScreen(winner, resetGame);
  showEndScreen();
}

/**
 * Handles an attack on the game board initiated by a player.
 * @param {HTMLElement} cell - The DOM element representing the target cell.
 * @param {Object} player - The player object initiating the attack.
 * @param {Object} computer - The opponent player object.
 */
function handleAttack(cell, player, computer) {
  let winner = getTheWinner(player, computer);
  if (winner) {
    handleGameOver(winner);
    return;
  }

  let row = parseInt(cell.dataset.row);
  let col = parseInt(cell.dataset.col);
  const attackResult = player.attack(computer, row, col);

  renderAttack(cell, attackResult);

  if (attackResult === 'illegal') return;
  if (attackResult === 'hit') displayNumOfShips(computer);

  computer.attack(player).then((result) => {
    winner = getTheWinner(player, computer);
    if (winner) {
      handleGameOver(winner);
      return;
    }

    const [attackResult, attackedRow, attackedCol] = result;
    const attackedCell = getGridCell('player', attackedRow, attackedCol);

    renderAttack(attackedCell, attackResult);

    if (attackResult === 'hit') displayNumOfShips(player);
  });
}

/**
 * Initializes the game by creating player and computer objects, placing ships randomly,
 * rendering ships, updating ship counts, and adding event listeners for attacks.
 * @returns {void}
 */
function initializeGame() {
  removeStartScreen();
  createGameScreen();
  let player = new Player('Human Player');
  const playerShips = new createShips();
  let computer = AIPlayer(new Player('Computer'));
  const computerShips = new createShips();
  const computerGridCells = getAllDOMGameboardCells('computer');

  player.placeShipRandomly(playerShips);
  computer.placeShipRandomly(computerShips);
  renderShips('player', player);

  displayNumOfShips(player);
  displayNumOfShips(computer);

  computerGridCells.forEach((cell) =>
    cell.addEventListener('click', attackHandler)
  );

  /**
   * Handles an attack initiated by the player.
   * @param {Event} event - The click event on the game board cell.
   * @returns {void}
   */
  function attackHandler(event) {
    console.log('called');
    const cell = event.target;
    handleAttack(cell, player, computer);
  }
}

/**
 * Resets the game by deleting the current player and computer objects, instantiating new ones,
 * placing ships randomly, rendering ships, updating ship counts, adding event listeners for attacks,
 * and displaying the game screen.
 * @param {Player} player - The player object.
 * @param {Object} computer - The computer object.
 * @returns {void}
 */
function resetGame(player, computer) {
  player = null;
  computer = null;

  player = new Player('Human Player');
  const playerShips = new createShips();
  computer = AIPlayer(new Player('Computer'));
  const computerShips = new createShips();

  removeEndScreen();
  createGameScreen();
  
  player.placeShipRandomly(playerShips);
  computer.placeShipRandomly(computerShips);
  
  resetGridRender('player');
  resetGridRender('computer');
  
  renderShips('player', player);

  displayNumOfShips(player);
  displayNumOfShips(computer);

  const computerGridCells = getAllDOMGameboardCells('computer');
  computerGridCells.forEach((cell) =>
    cell.addEventListener('click', attackHandler)
  );

  /**
   * Handles an attack initiated by the player.
   * @param {Event} event - The click event on the game board cell.
   * @returns {void}
   */
  function attackHandler(event) {
    const cell = event.target;
    handleAttack(cell, player, computer);
  }
}

;// CONCATENATED MODULE: ./src/index.js




createStartScreen(initializeGame);

/******/ })()
;
//# sourceMappingURL=app.bundle.js.map