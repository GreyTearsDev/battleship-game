'use strict'
 import gameboard from '../modules/board';

export function Player() {
 const BOARD = gameboard();
 const attack = (enemyPlayer, row, col) => {
   enemyPlayer.BOARD.receiveAttack(row, col)
 };
 return {
  BOARD,
  attack,
 }
}
