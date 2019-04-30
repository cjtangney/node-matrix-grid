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

export default class Player {
  constructor(playerData) {
    // document the playerData object
    this.currentLocation = playerData.currentLocation;
    this.color = COLORS[Math.ceil(Math.random() * 10)];
    this.moveSpeed = 3;
    this.availableMoves = this.calculateMoves();
  };

  calculateMoves() {
    const calculatedMoves = [];
    const startingPoint = this.currentLocation;
    const moveSpeed = this.moveSpeed;
    let forwardPoint = {},
        backwardPoint = {};

    // calculates moves vertically
    for(let i = 1; i <= moveSpeed; i += 1) {
      forwardPoint = {
        x: startingPoint.x,
        y: startingPoint.y + i,
      };
      backwardPoint = {
        x: startingPoint.x,
        y: startingPoint.y - i,
      }
      calculatedMoves.push(forwardPoint);
      calculatedMoves.push(backwardPoint);
    };
    // calculates moves horizontally
    for(let i = 1; i <= moveSpeed; i += 1) {
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
    };
    return(calculatedMoves.filter(move => (
        (move.x >= 0 && move.y >= 0) && 
        (move.x < 10 && move.y < 10)
      )
    ));
  };
};
