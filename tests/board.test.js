const Gameboard = require('../src/modules/board')

describe('Gameboard Methods', () => {
  let gameboard;
  let ship;
  const coor = [8, 5]; // coordinates
  

  beforeEach(() => {    
    gameboard = Gameboard()
    ship = {
      name: "Destroyer",
      length: 4, 
      orientation() {
        return "horizontal" 
      }
    }
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
  })


  
})
