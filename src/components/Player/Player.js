/**
 * PLAYER CLASS IS A WORK IN PROGRESS AND IS CURRENTLY
 * STORING WHAT I CONSIDER TO BE THE BARE MINIMUM. THIS
 * CLASS WILL CHANGE FREQUENTLY AS THE FUNCTIONALITY OF
 * THE GAME IMPROVES.
 *
 * Yeet. Thanks.
 */

// temporary enumeration for Player color
// TODO: make this not shitty.
const COLORS = {
  1: 'red',
  2: 'orange',
  3: 'yellow',
  4: 'green',
  5: 'purple',
  6: 'fuchsia',
  7: 'teal',
  8: 'aqua',
  9: 'blue',
  10: 'lime',
};
Object.freeze(COLORS);

/**
 * Basic Player object only needs the starting coordinate
 * for right now. All other attributes are either hard-coded
 * (move speed) or randomly assigned (color).
 *
 * @param {x, y} currentLocation,
 */
export default class Player {
  constructor(playerData) {
    // document the playerData object
    this.currentLocation = playerData.currentLocation;
    this.color = COLORS[Math.ceil(Math.random() * 10)];
    this.moveSpeed = 3;
    this.availableMoves = this.calculateMoves();
  }

  /**
   * Uses moves speed to caluclate available moves in 4
   * cardinal directions. Does not include moves that would
   * fall outside the bounds of the GameBoard area.
   *
   * @return {Array[{object}]}
   */
  calculateMoves() {
    const calculatedMoves = [];
    const startingPoint = this.currentLocation;
    const { moveSpeed } = this;
    let forwardPoint = {};
    let backwardPoint = {};

    // calculates moves vertically
    for (let i = 1; i <= moveSpeed; i += 1) {
      forwardPoint = {
        x: startingPoint.x,
        y: startingPoint.y + i,
      };
      backwardPoint = {
        x: startingPoint.x,
        y: startingPoint.y - i,
      };
      calculatedMoves.push(forwardPoint);
      calculatedMoves.push(backwardPoint);
    }
    // calculates moves horizontally
    for (let i = 1; i <= moveSpeed; i += 1) {
      forwardPoint = {
        x: startingPoint.x + i,
        y: startingPoint.y,
      };
      backwardPoint = {
        x: startingPoint.x - i,
        y: startingPoint.y,
      };
      calculatedMoves.push(forwardPoint);
      calculatedMoves.push(backwardPoint);
    }
    return (calculatedMoves.filter(move => (
      (move.x >= 0 && move.y >= 0)
      && (move.x < 10 && move.y < 10)
    )));
  }
}
