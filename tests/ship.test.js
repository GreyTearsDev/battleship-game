const Ship = require('../src/modules/ship');

describe('Ship Methods', () => {
  let ship;

  beforeEach(() => {
    ship = Ship("Destroyer", 2);
  });

  describe('Name Related Methods', () => {
    test('getName should return the name of the ship', () => {
      expect(ship.getName()).toMatch("Destroyer");
    });  
  });
  
  describe('Length Related Methods', () => {
    test('ship should have a getLength method', () => {
      expect(ship.getLength()).toBeDefined();
    });
    
    test('getLength should work correctly', () => {
      expect(ship.getLength()).toBe(2);
    });
  });

  describe('Damage Related Methods', () => {
    test('ship should have a hitCount method', () => {
      expect(ship.hitCount).toBeDefined();
    });
    
    test('ship should have a hit method', () => {
      expect(ship.hit).toBeDefined();
    });
    
    test('hit method shouuld increase hitCount', () => {
      ship.hit()
      let damage = ship.hitCount()
      expect(damage).toBe(1);
    });
    
    test('ship should be sunk when hit enough times', () => {
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBeTruthy();
    });
  });
});
