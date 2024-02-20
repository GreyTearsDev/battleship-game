const Gameboard = require('../src/modules/board')

describe('Gameboard Methods', () => {
  let gameboard;

  beforeEach(() => {    
    gameboard = Gameboard()
  })

  test('placeShip should be able to place ships at specific coordinates', () => {
    const ship = {
      name: "Destroyer",
      length: 5, 
      orientation() {
        return "horizontal" 
      }
    }
    const board = gameboard.getBoard()
    gameboard.placeShip(ship, 2, 2);
    expect(board[2][2]).toBe(ship.length)
  });

  test("isLegal should say if a ship can be placed at a specific coordinate", () => {
    
  })


  
})
