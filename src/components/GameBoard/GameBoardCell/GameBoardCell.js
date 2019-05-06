import Cell from '../../Cell';

/**
 * Represents a particular cell on the
 * GameBoard.
 *
 * @param {number} x,
 * @param {number} y,
 * @prop {bool} active,
 * @prop {Array[GameBoardCell]} neighbors,
 */
export default class GameBoardCell extends Cell {
  constructor(x, y) {
    super(x, y);
  }
}
