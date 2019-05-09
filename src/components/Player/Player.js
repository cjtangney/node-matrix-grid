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

const DEFAULT_PLAYER = {
  playerName: 'John Doe',
  playerRace: 'Human',
  playerClass: 'NPC',
  playerAge: 35,
  playerHeight: 70,
  playerWeight: 165,
  playerStats: {},
  playerInventory: [],
  playerAlignment: 'Neutral Good',
  playerBackground: 'Adventurer',
  playerSpeed: 3,
  playerHitPoints: 100,
  playerExperience: 0,
  playerLevel: 0,
  playerColor: 1,
  currentLocation: { x: 0, y: 0 },
  availableMoves: [],
};
Object.freeze(DEFAULT_PLAYER);

/**
 * Basic Player object only needs the starting coordinate
 * for right now. All other attributes are either hard-coded
 * (move speed) or randomly assigned (color).
 *
 * @param {x, y} currentLocation,
 */
export default class Player {
  constructor(playerData) {
    const player = Object.assign({}, DEFAULT_PLAYER, playerData);
    this.playerName = player.playerName;
    this.playerRace = player.playerRace;
    this.playerClass = player.playerClass;
    this.playerAge = player.playerAge;
    this.playerHeight = player.playerHeight;
    this.playerWeight = player.playerWeight;
    this.playerStats = player.playerStats;
    this.playerInventory = player.playerInventory;
    this.playerAlignment = player.playerAlignment;
    this.playerBackground = player.playerBackground;
    this.playerSpeed = player.playerSpeed;
    this.totalHitPoints = player.playerHitPoints;
    this.currentHitPoints = player.playerHitPoints;
    this.playerExperience = player.playerExperience;
    this.playerLevel = player.playerLevel;
    this.color = COLORS[Math.ceil(Math.random() * 10)];
    this.currentLocation = player.currentLocation;
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
    const { playerSpeed } = this;
    let forwardPoint = {};
    let backwardPoint = {};

    // calculates moves vertically
    for (let i = 1; i <= playerSpeed; i += 1) {
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
    for (let i = 1; i <= playerSpeed; i += 1) {
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

  /**
   * @return {string}
   */
  getPlayerName() {
    return this.playerName;
  }

  /**
   * @param {string} name
   */
  setPlayerName(name) {
    this.playerName = name;
  }

  /**
   * @return {string}
   */
  getPlayerRace() {
    return this.playerRace;
  }

  /**
   * @param {string} race
   */
  setPlayerRace(race) {
    this.playerRace = race;
  }

  /**
   * @return {string}
   */
  getPlayerClass() {
    return this.playerClass;
  }

  /**
   * @param {string} playerClass
   */
  setPlayerClass(playerClass) {
    this.playerClass = playerClass;
  }

  /**
   * @return {number}
   */
  getPlayerAge() {
    return this.playerAge;
  }

  /**
   * @param {number} age
   */
  setPlayerAge(age) {
    this.playerAge = age;
  }

  /**
   * @return {number}
   */
  getPlayerHeight() {
    return this.playerHeight;
  }

  /**
   * @param {number} height
   */
  setPlayerHeight(height) {
    this.playerHeight = height;
  }

  /**
   * @return {number}
   */
  getPlayerWeight() {
    return this.playerWeight;
  }

  /**
   * @param {number} weight
   */
  setPlayerWeight(weight) {
    this.playerWeight = weight;
  }

  /**
   * @return {object}
   */
  getPlayerStats() {
    return this.playerStats;
  }

  /**
   * For now, the Inventory is an array that
   * consists of Item objects.
   *
   * @return {Array}
   */
  getPlayerInventory() {
    return this.playerInventory;
  }

  /**
   * @return {string}
   */
  getPayerAlignment() {
    return this.playerAlignment;
  }

  /**
   * @param {string} alignment
   */
  setPlayerAlignment(alignment) {
    this.playerAlignment = alignment;
  }

  /**
   * @return {string}
   */
  getPlayerBackground() {
    return this.playerBackground;
  }

  /**
   * @param {string} background
   */
  setPlayerBackground(background) {
    this.playerBackground = background;
  }

  /**
   * @return {number}
   */
  getPlayerSpeed() {
    return this.playerSpeed;
  }

  /**
   * @param {number} speed
   */
  setPlayerSpeed(speed) {
    this.playerSpeed = speed;
  }

  /**
   * @return {number}
   */
  getTotalHitPoints() {
    return this.totalHitPoints;
  }

  /**
   * @return {number}
   */
  getCurrentHitPoints() {
    return this.currentHitPoints;
  }

  /**
   * Decreases current hit points by the
   * provided value
   *
   * @param {number} damage
   */
  takeDamage(damage) {
    this.currentHitPoints -= damage;
  }

  /**
   * @return {number}
   */
  getPlayerExperience() {
    return this.playerExperience;
  }

  /**
   * @return {number}
   */
  getPlayerLevel() {
    return this.playerLevel;
  }

  /**
   * Increases the Player's current level by 1
   */
  levelUp() {
    this.playerLevel += 1;
  }

  /**
   * Returns the Player's current (X, Y) coordinate
   *
   * @return {x, y}
   */
  getCurrentLocation() {
    return this.currentLocation;
  }
}
