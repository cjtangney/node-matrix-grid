/**
 * Represents a particular cell in the
 * NodeMatrix.
 * @param {number} x,
 * @param {number} y,
 * @prop {bool} active,
 * @prop {Array[Cell]} neighbors,
 */
export default class Cell {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.active = false;
    this.neighbors = undefined;
    this.data = [];
  };

  /**
   * Finds the coordinates for each of the
   * cell's neighbors within the NodeMatrix's
   * boundaries.
   * @param {Array[{number, number}]} neighbors,
   * @param {number} height,
   * @param {number} width,
   */
  setNeighborPoints(
    neighbors,
    height,
    width,
  ) {
    this.neighbors = neighbors.filter(neighbor => (
      (neighbor.x >= 0 && neighbor.y >= 0)
      && (neighbor.x < width && neighbor.y < height)
    ));
  }

  /**
   * Updates the neighbors array
   * @param {Array[Cell]} neighbors,
   */
  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  /**
   * Toggles the Cell active state
   */
  toggleActive() {
    this.active = !this.active;
  }

  /**
   * Pushes content into the Cell.
   * @param {} content
   */
  pushContents(content) {
    this.data.push(content);
  }

  /**
   * Returns the last element from the
   * Cell contents. This method
   * will mutate the contents.
   * @return {}
   */
  popContents() {
    return (this.data.pop());
  }

  /**
   * Returns the first element from the
   * Cell contents. This method
   * will mutate the contents.
   * @return {}
   */
  shiftContents() {
    return (this.data.shift());
  }

  /**
   * Returns all of the Cell's
   * contents. This method does not mutate
   * the contents.
   */
  getContents() {
    return (this.data);
  }
};
