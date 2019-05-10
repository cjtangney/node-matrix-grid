// linter overrides
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/no-unused-state */
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Board from './GameBoard';
import AddPlayerModal from '../Modal/AddPlayerModal';
import Player from '../Player';

import './GameBoard.css';

/**
 * At the moment, this index file is kind of a 'view layer'
 * for the GameBoard component in that it handles most of
 * the GUI updates. Consider baking this into the home view.
 *
 * @param {number} boardX,
 * @param {number} boardY,
 * @param {number} canvasWidth,
 * @param {number} canvasHeight,
 * @prop {func} addPlayerToGame,
 * @prop {number} playerTurn,
 * @prop {object} currentPlayer,
 */
export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    // board dimensions. at the moment,
    // only square boards are supported.
    this.state = {
      // BOARD_X: props.boardX,
      // BOARD_Y: props.boardY,
      CELL_SIZE: (props.canvasHeight / props.boardY),
      ADD_PLAYER_MODAL: 'home-modal',
      canvasWidth: props.canvasWidth,
      canvasHeight: props.canvasHeight,
      data: new Board(props.boardY, props.boardX),
      canvasContext: undefined,
      players: [],
      playerTurn: undefined,
      currentPlayer: undefined,
    };

    this.showAddPlayerModal = this.showAddPlayerModal.bind(this);
    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.clearPrevActivePlayerMoves = this.clearPrevActivePlayerMoves.bind(this);
    this.highlightPlayerMoves = this.highlightPlayerMoves.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  /**
   * Draws the GameBoard once the component has mounted
   */
  componentDidMount() {
    // Board variables
    const { canvasWidth, canvasHeight, CELL_SIZE } = this.state;
    const gameBoardCanvas = document.getElementById('map');
    const gameBoardWidth = canvasWidth;
    const gameBoardHeight = canvasHeight;
    const mapContext = gameBoardCanvas.getContext('2d');

    this.setState({
      canvasContext: mapContext,
    });

    // Initial draw
    mapContext.strokeStyle = '#575757';
    for (let w = (CELL_SIZE / 2); w < gameBoardWidth; w += CELL_SIZE) {
      for (let h = (CELL_SIZE / 2); h < gameBoardHeight; h += CELL_SIZE) {
        mapContext.beginPath();
        mapContext.strokeRect(
          (w - (CELL_SIZE / 2)),
          (h - (CELL_SIZE / 2)),
          CELL_SIZE,
          CELL_SIZE,
        );
        mapContext.closePath();
      }
    }
  }

  /**
   * Component lifecyle method that fires when state is altered.
   * Currently handles re-drawing GameBoard.
   *
   * @param {props} prevProps,
   */
  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.currentPlayer;
    const { currentPlayer, playerTurn } = this.props;
    if (prevPlayer !== currentPlayer) {
      if (prevPlayer !== undefined) {
        this.clearPrevActivePlayerMoves(prevPlayer);
      }
      this.highlightPlayerMoves();
      this.onUpdate({
        currentPlayer,
        playerTurn,
      });
    }
  }

  /**
   * Updates the state object when the component has
   * been redrawn.
   *
   * @param {object} newState,
   */
  onUpdate(newState) {
    const { currentPlayer, playerTurn } = newState;
    this.setState({
      currentPlayer,
      playerTurn,
    });
  }

  /**
   * Highlights a given Player's available moves based on
   * the assigned Player move-speed.
   */
  highlightPlayerMoves() {
    const { currentPlayer } = this.props;
    const { CELL_SIZE, canvasContext, data: gameBoard } = this.state;
    canvasContext.fillStyle = 'rgba(0,125,255,0.25)';
    currentPlayer.availableMoves.forEach((move) => {
      canvasContext.beginPath();
      canvasContext.rect(
        (move.x * CELL_SIZE) + 1,
        (move.y * CELL_SIZE) + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
      );
      canvasContext.fill();
      canvasContext.closePath();
    });
  }

  /**
   * Clears a point from the GameBoard GUI. Does not
   * remove the point from the data.
   *
   * @param {x, y} coordinate,
   */
  clearPoint(coordinate) {
    const { CELL_SIZE, canvasContext, data: gameBoard } = this.state;
    // clear the cell contents then re-draw the empty cell
    canvasContext.clearRect(
      (coordinate.x * CELL_SIZE),
      (coordinate.y * CELL_SIZE),
      CELL_SIZE,
      CELL_SIZE,
    );
    canvasContext.beginPath();
    canvasContext.strokeRect(
      (coordinate.x * CELL_SIZE),
      (coordinate.y * CELL_SIZE),
      CELL_SIZE,
      CELL_SIZE,
    );
    canvasContext.closePath();

    // redraw a player if they were in a cell
    if (gameBoard.getData(coordinate).data.length > 0) {
      const player = gameBoard.getData(coordinate).data[0];
      this.drawPlayer(player.currentLocation, player);
    }
  }

  /**
   * Draws a player on the GameBoard using the provided
   * coordinate and randomized Player color.
   *
   * @param {x, y} coordinate,
   * @param {Player} player,
   */
  drawPlayer(coordinate, player) {
    const { CELL_SIZE, canvasContext } = this.state;
    canvasContext.fillStyle = player.color;
    canvasContext.beginPath();
    canvasContext.rect(
      (coordinate.x * CELL_SIZE) + 1,
      (coordinate.y * CELL_SIZE) + 1,
      CELL_SIZE - 2,
      CELL_SIZE - 2,
    );
    canvasContext.fill();
    canvasContext.closePath();
  }

  /**
   * Loops through the previous Player's available moves,
   * re-drawing all previously highlighted cells
   *
   * @param {Player} prevPlayer,
   */
  clearPrevActivePlayerMoves(prevPlayer) {
    prevPlayer.availableMoves.forEach((coordinate) => {
      this.clearPoint(coordinate);
    });
  }

  /**
   * Shows the modal for adding a Player to the game
   */
  showAddPlayerModal() {
    const { ADD_PLAYER_MODAL } = this.state;
    const modal = document.getElementById(ADD_PLAYER_MODAL);
    modal.style.visibility = 'visible';
    modal.style.display = 'block';
  }

  /**
   * Adds a new Player object to the GameBoard data. Uses
   * the coordinates provided in the ADD_PLAYER_MODAL in order
   * to insert data into the GameBoard Node Matrix.
   *
   * This method is passed down to the Modal component and is used
   * as the onclick handler for the confirm button.
   */
  addNewPlayer() {
    // necessary data references
    const { data, players, ADD_PLAYER_MODAL } = this.state;
    const gameBoard = data;
    const modal = document.getElementById(ADD_PLAYER_MODAL);
    const xInput = document.getElementById('player-start-x');
    const yInput = document.getElementById('player-start-y');
    const playerName = document.getElementById('player-name');
    const playerRace = document.getElementById('player-race');
    const playerClass = document.getElementById('player-class');
    const playerAge = document.getElementById('player-age');
    const playerWeight = document.getElementById('player-weight');
    const playerHeight = document.getElementById('player-height');
    const playerBackground = document.getElementById('player-background');
    const playerAlignment = document.getElementById('player-alignment');
    const playerSpeed = document.getElementById('player-speed');

    const targetCell = {
      x: Number(xInput.value),
      y: Number(yInput.value),
    };

    /**
     * create a new Player, push it to the correct target cell
     * in the GameBoard data, then update the component state.
     */
    let playerData = { currentLocation: targetCell };
    playerName.value !== '' && (playerData.playerName = playerName.value);
    playerRace.value !== '' && (playerData.playerRace = playerRace.value);
    playerClass.value !== '' && (playerData.playerClass = playerClass.value);
    playerAge.value !== '' && (playerData.playerAge = playerAge.value);
    playerWeight.value !== '' && (playerData.playerWeight = playerWeight.value);
    playerHeight.value !== '' && (playerData.playerHeight = playerHeight.value);
    playerBackground.value !== '' && (playerData.playerBackground = playerBackground.value);
    playerAlignment.value !== '' && (playerData.playerAlignment = playerAlignment.value);
    playerSpeed.value !== '' && (playerData.playerSpeed = playerSpeed.value);
    const newPlayer = new Player(playerData);

    // clear and hide the ADD_PLAYER_MODAL
    xInput.value = '';
    yInput.value = '';
    playerName.value = '';
    playerRace.value = '';
    playerClass.value = '';
    playerAge.value = '';
    playerWeight.value = '';
    playerHeight.value = '';
    playerBackground.value = '';
    playerAlignment.value = '';
    playerSpeed.value = '';
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';

    gameBoard.getData(targetCell).pushContents(newPlayer);
    players.push({
      playerNum: (players.length + 1),
      player: newPlayer,
    });
    this.setState({
      players,
      data: gameBoard,
    });
    if (gameBoard.getActiveCell() === undefined) {
      gameBoard.setActiveCell(gameBoard.getData(targetCell));
      gameBoard.activeCell.toggleActive();
    }

    // draw new players on the GameBoard
    this.drawPlayer(targetCell, newPlayer);
    const { addPlayerToGame } = this.props;
    addPlayerToGame(newPlayer);

    // debugging
    // console.log(gameBoard);
  }

  render() {
    const { canvasHeight, canvasWidth } = this.props;
    const { ADD_PLAYER_MODAL } = this.state;
    return (
      <div>
        <canvas
          id='map'
          height={canvasHeight}
          width={canvasWidth}
          onClick={this.handleClick}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <button type='button' className='nes-btn is-primary' onClick={() => { this.showAddPlayerModal(); }}>Add Player</button>
        </div>
        <AddPlayerModal id={ADD_PLAYER_MODAL} addNewPlayer={this.addNewPlayer} />
      </div>
    );
  }
}

/**
 * Expected propTypes
 */
GameBoard.propTypes = {
  boardX: PropTypes.number.isRequired,
  boardY: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  addPlayerToGame: PropTypes.func,
  playerTurn: PropTypes.number,
  currentPlayer: PropTypes.object,
};

/**
 * Default props
 */
GameBoard.defaultProps = {
  addPlayerToGame: undefined,
  playerTurn: undefined,
  currentPlayer: undefined,
};
