const createShip = require('../src/modules/ship');

describe('Ship Methods', () => {
  let ship;

  beforeEach(() => {
    ship = createShip();
  });

  describe('Name Related Methods', () => {
    test('setName and getName should work correctly', () => {
      ship.setName("Destroyer");
      expect(ship.getName()).toMatch("Destroyer");
    });  
  });
  
  describe('Length Related Methods', () => {
    test('ship should have a setLength method', () => {
      expect(ship.setLength).toBeDefined();
    });

    test('ship should have a getLength method', () => {
      expect(ship.getLength).toBeDefined();
    });
    
    test('setLength and getLength should work correctly', () => {
      ship.setLength(5)
      expect(ship.getLength()).toBe(5);
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
      ship.setLength(2);
      ship.hit();
      ship.hit();
      expect(ship.isSunk()).toBeTruthy();
    });
  });
});
