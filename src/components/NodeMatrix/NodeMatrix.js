/**
 * Creates a NodeMatrix of fixed
 * height and width.
 *
 * @param {number} height,
 * @param {number} width,
 * @prop {Array[Array[Cell]]} rows,
 */
export default class NodeMatrix {
  constructor(height, width) {
    this.height = height;
    this.width = width;
    this.data = [];
    this.initialize();
  }

  /**
   * Creates the data strcture using a number
   * of fixed-length arrays
   */
  initialize() {
    this.data = Array.from([].fill.call({
      length: this.height,
    }, 0));
    this.data.forEach((row, i) => {
      this.data[i] = Array.from([].fill.call({
        length: this.width,
      }, 0));
    });
  }

  /**
   * @return {number} height
   */
  getHeight() {
    return this.height;
  }

  /**
   * @return {number} width
   */
  getWidth() {
    return this.width;
  }

  /**
   * Inserts data into the NodeMatrix at the
   * specified coordinate.
   *
   * @param {x, y} point
   * @param {*} payload
   */
  putData(point, payload) {
    const { x, y } = point;
    this.data[x][y] = payload;
  }

  /**
   * Returns data from the NodeMatrix at the
   * specified coordinate
   *
   * @param {x, y} point
   * @return {*}
   */
  getData(point) {
    const { x, y } = point;
    return this.data[y][x];
  }
}
