export default class Player {
  constructor(playerData) {
    // document the playerData object
    this.currentLocation = playerData.currentLocation;
    this.color = playerData.color;
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
      }
      calculatedMoves.push(forwardPoint);
      calculatedMoves.push(backwardPoint);
    }
    return(calculatedMoves.filter(move => (
        (move.x >= 0 && move.y >= 0) && 
        (move.x < 10 && move.y < 10)
      )
    ));
  };
};
