import Gameboard from '../src/modules/board';
import Ship from '../src/modules/ship';
import {jest} from '@jest/globals'

jest.mock('../src/modules/ship')

describe('Gameboard Methods', () => {
  let gameboard;
  let ship;
  const coor = [8, 5]; // coordinates
  
  beforeEach(() => {    
    gameboard = Gameboard();
  
    ship = {
      name: "destroyer",
      length: 4, 
      damage: 0,
      orientation: jest.fn(() => "horizontal"),
      hit: jest.fn(() => ++ship.damage),
      hitCount: jest.fn(() => ship.damage),
      getLength: jest.fn(() => ship.length)
    };
    Ship.mockReturnValue(ship)
  
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  test('placeShip should be able to place ships at specific coordinates', () => {
    const board = gameboard.getBoard();
    gameboard.placeShip(ship, coor[0], coor[1]);
    expect(board[coor[0]][coor[1]]).toBe(ship.length);
  });

  test("isLegal should say if a ship can be placed at a specific coordinate", () => {
    expect(gameboard.isLegal(ship, coor[0], coor[1])).toBeTruthy();
    
    coor[0] = 5;
    coor[1] = 7;
    
    expect(gameboard.isLegal(ship, coor[0], coor[1])).toBeFalsy();
  });

  describe("receiveAttack Related Functionality", () => {

    beforeEach(() => {
      gameboard.placeShip(ship, coor[0], coor[1]);
    })
    
    test("should determine if the attack hit a ship or not", () => {
      expect(gameboard.receiveAttack(coor[0], coor[1])).toBeTruthy()
      expect(gameboard.receiveAttack(coor[0] - 1, coor[1])).toBeFalsy()
    });

    test("should send the 'hit' function to the correct ship", () => {
      gameboard.receiveAttack(coor[0], coor[1]);
      expect(ship.hitCount()).toBe(ship.damage);
    });

    test("should record the coordinates of missed shots", () => {
      gameboard.receiveAttack(coor[0] - 3, coor[1]);
      const missedShots = gameboard.getMissedShots();
      expect(missedShots.size).toBeGreaterThan(0)
    })
  })


  
})
