import { AIPlayer } from '../src/modules/ai-player';
import { Player } from '../src/modules/player';
import getRandomInt from '../src/utilities/random-int';

jest.mock('../src/utilities/random-int');
jest.useFakeTimers();

describe('AIPlayer', () => {
  let aiPlayer;
  let playerMock;
  let enemyPlayerMock;

  beforeEach(() => {
    playerMock = Player();
    playerMock.attack = jest.fn();
    playerMock.usedCoordinates = new Set();
    enemyPlayerMock = {};
    
    aiPlayer = AIPlayer(playerMock);
  });
  
  test('attack method should make a valid attack on the player', () => {
    getRandomInt.mockReturnValueOnce(3);
    getRandomInt.mockReturnValueOnce(5);
    aiPlayer.attack(enemyPlayerMock);

    // Ensure that playerMock.attack is called with the correct arguments
    expect(playerMock.attack).not.toHaveBeenCalled()
    // Advance timers to execute the attack
    jest.advanceTimersByTime(200);
    // Check if the attack is made
    expect(playerMock.attack).toHaveBeenCalledWith(enemyPlayerMock, 3, 5);
  });

  test('gameboard property should return the correct gameboard object', () => {
    expect(aiPlayer.gameboard).toEqual(expect.objectContaining({
      receiveAttack: expect.any(Function)
    }));
  });
  
});
