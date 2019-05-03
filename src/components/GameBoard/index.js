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

    // handlers
    this.showAddPlayerModal = this.showAddPlayerModal.bind(this);
    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.clearPrevActivePlayer = this.clearPrevActivePlayer.bind(this);
    this.highlightPlayerMoves = this.highlightPlayerMoves.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

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

  componentDidUpdate(prevProps) {
    const prevPlayer = prevProps.currentPlayer;
    const { currentPlayer, playerTurn } = this.props;
    if (prevPlayer !== currentPlayer) {
      if (prevPlayer !== undefined) {
        this.clearPrevActivePlayer(prevPlayer);
      }
      this.highlightPlayerMoves();
      this.onUpdate({
        currentPlayer,
        playerTurn,
      });
    }
  }

  onUpdate(newState) {
    const { currentPlayer, playerTurn } = newState;
    this.setState({
      currentPlayer,
      playerTurn,
    });
  }

  highlightPlayerMoves() {
    const { currentPlayer } = this.props;
    const { CELL_SIZE, canvasContext } = this.state;
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

  clearPoint(coordinate) {
    const { CELL_SIZE, canvasContext, data } = this.state;
    const gameBoard = data;
    canvasContext.clearRect(
      (coordinate.x * CELL_SIZE),
      (coordinate.y * CELL_SIZE),
      CELL_SIZE,
      CELL_SIZE,
    );
    canvasContext.fillStyle = 'red';
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

  clearPrevActivePlayer(prevPlayer) {
    prevPlayer.availableMoves.forEach((coordinate) => {
      this.clearPoint(coordinate);
    });
  }

  showAddPlayerModal() {
    const { ADD_PLAYER_MODAL } = this.state;
    const modal = document.getElementById(ADD_PLAYER_MODAL);
    modal.style.visibility = 'visible';
    modal.style.display = 'block';
  }

  addNewPlayer() {
    const { data, players, ADD_PLAYER_MODAL } = this.state;
    const gameBoard = data;
    const modal = document.getElementById(ADD_PLAYER_MODAL);
    const xInput = document.getElementById('player-start-x');
    const yInput = document.getElementById('player-start-y');
    const targetCell = {
      x: Number(xInput.value),
      y: Number(yInput.value),
    };
    xInput.value = '';
    yInput.value = '';
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
    const newPlayer = new Player({
      currentLocation: targetCell,
    });
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

GameBoard.propTypes = {
  boardX: PropTypes.number.isRequired,
  boardY: PropTypes.number.isRequired,
  canvasWidth: PropTypes.number.isRequired,
  canvasHeight: PropTypes.number.isRequired,
  addPlayerToGame: PropTypes.func,
  playerTurn: PropTypes.number,
  currentPlayer: PropTypes.object,
};

GameBoard.defaultProps = {
  addPlayerToGame: undefined,
  playerTurn: undefined,
  currentPlayer: undefined,
};
