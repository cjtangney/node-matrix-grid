// linter overrides
/* eslint-disable no-param-reassign */
import NodeMatrix from '../NodeMatrix';
import GameBoardCell from './GameBoardCell';

/**
 * Extends NodeMatrix.
 * Add GameBoard properties, like activeCell
 *
 * @param {number} height,
 * @param {number} width,
 * @prop {Array[Array[GameBoardCell]]} rows,
 * @prop {GameBoardCell} activeCell,
 */
export default class GameBoard extends NodeMatrix {
  constructor(height, width) {
    super(height, width);
    this.activeCell = undefined;
    this.addCells().then(this.updateNeighbors());
  }

  /**
   * Fills GameBoard.rows with GameBoardCell
   * objects.
   *
   * @return {Promise}
   */
  async addCells() {
    const gameBoardHeight = this.getHeight();
    const gameBoardWidth = this.getWidth();
    this.data.forEach((row, y) => {
      for (let x = 0; x < row.length; x += 1) {
        row[x] = new GameBoardCell(x, y);
        row[x].setNeighborPoints([
          { x: x - 1, y },
          { x, y: y - 1 },
          { x: x + 1, y },
          { x, y: y + 1 },
        ], gameBoardHeight, gameBoardWidth);
      }
    });
  }

  /**
   * Updates all GameBoardCell neighbor coordinates
   * to the correct GameBoardCell reference.
   */
  updateNeighbors() {
    this.data.forEach((row, y) => {
      for (let x = 0; x < row.length; x += 1) {
        const neighbors = [];
        row[y].neighbors.forEach((neighbor) => {
          neighbors.push(this.getData(neighbor));
        });
        row[y].setNeighbors(neighbors);
      }
    });
  }

  /**
   * Sets active cell on the GameBoard
   * given a coordinate.
   *
   * @param {{number, number}} point,
   */
  setActiveCell(point) {
    const { x, y } = point;
    this.activeCell = this.data[y][x];
  }

  /**
   * Returns the current active cell
   * from the GameBoard.
   *
   * @return {GameBoardCell}
   */
  getActiveCell() {
    return this.activeCell;
  }
}
