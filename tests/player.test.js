import { Player } from '../src/modules/player'
import { jest } from '@jest/globals'

jest.mock('../src/modules/board');

describe('Player Related Methods', () => {
  let player;
  let enemyPlayer;

  beforeEach(() => {
    player = Player();
    enemyPlayer = {
      BOARD: {
        receiveAttack: jest.fn(),
      },
    };
  });
  
  test('attack method should be called with row and col as arguments', () => {
    const row = 2;
    const col = 3;

    player.attack(enemyPlayer, row, col);
    expect(enemyPlayer.BOARD.receiveAttack).toHaveBeenCalledWith(row, col);
  
  });
});

