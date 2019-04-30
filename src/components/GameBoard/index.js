import React, { Component } from 'react';
import { GameBoard as Board } from './GameBoard';
import AddPlayerModal from '../Modal/AddPlayerModal';
import Player from '../Player';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);

    // board dimensions. at the moment,
    // only square boards are supported.
    this.state = {
      BOARD_X: props.boardX,
      BOARD_Y: props.boardY,
      CELL_SIZE: (props.canvasHeight / props.boardY),
      ADD_PLAYER_MODAL: 'home-modal',
      canvasWidth: props.canvasWidth,
      canvasHeight: props.canvasHeight,
      data: new Board(props.boardY, props.boardX),
      canvasContext: undefined,
      players: [],
    };

    // handlers
    // this.handleClick = this.handleClick.bind(this);
    this.showAddPlayerModal = this.showAddPlayerModal.bind(this);
    this.addNewPlayer = this.addNewPlayer.bind(this);
  }

  componentDidMount() {
    // Board variables
    const gameBoardCanvas = document.getElementById('map');
    const gameBoardWidth = this.state.canvasWidth;
    const gameBoardHeight = this.state.canvasHeight;
    const CELL_SIZE = this.state.CELL_SIZE;
    const mapContext = gameBoardCanvas.getContext('2d');

    this.setState({
      canvasContext: mapContext,
    })
  
    // Initial draw
    mapContext.strokeStyle = '#575757';
    for(let w = (CELL_SIZE / 2); w < gameBoardWidth; w += CELL_SIZE) {
      for(let h = (CELL_SIZE / 2); h < gameBoardHeight; h += CELL_SIZE) {
        mapContext.beginPath();
        mapContext.strokeRect(
          (w - (CELL_SIZE / 2)), 
          (h - (CELL_SIZE / 2)), 
          CELL_SIZE, 
          CELL_SIZE);
        mapContext.closePath();
      };
    };
  }

  // handleClick(event) {
  //   const gameBoard = this.state.data;
  //   const CELL_SIZE = this.state.CELL_SIZE;
  //   const point = {
  //     x: Math.trunc(event.nativeEvent.offsetX / CELL_SIZE),
  //     y: Math.trunc(event.nativeEvent.offsetY / CELL_SIZE),
  //   };
  //   const currentCell = gameBoard.getData(point);
  //   const prevCell = gameBoard.getActiveCell();

  //   /**
  //    * If the GameBoard had a previous active cell, it must
  //    * be cleared and the outline must be redrawn.
  //    */
  //   if(prevCell !== undefined) {
  //     prevCell.toggleActive();
  //     prevCell.popContents();
  //     this.clearPoint(prevCell);

  //     prevCell.neighbors.forEach(neighbor => {
  //       this.clearPoint({
  //         x: neighbor.x,
  //         y: neighbor.y,
  //       });
  //     });
  //   };

  //   /**
  //    * Fill the active cell.
  //    */
  //   this.drawPlayer({
  //     x: currentCell.x,
  //     y: currentCell.y,
  //   });

  //   // Update the GameBoard active cell.
  //   gameBoard.setActiveCell(currentCell);
  //   this.props.updateActiveCell(currentCell);
  //   gameBoard.activeCell.toggleActive();

  //   // debugging
  //   console.log(gameBoard);
  // }

  clearPoint(coordinate) {
    const CELL_SIZE = this.state.CELL_SIZE;
    const mapContext = this.state.canvasContext;
    mapContext.clearRect(
      (coordinate.x * CELL_SIZE), 
      (coordinate.y * CELL_SIZE), 
      CELL_SIZE, 
      CELL_SIZE);
    mapContext.fillStyle = 'red';    
    mapContext.beginPath();
    mapContext.strokeRect(
      (coordinate.x * CELL_SIZE), 
      (coordinate.y * CELL_SIZE), 
      CELL_SIZE, 
      CELL_SIZE);
    mapContext.closePath();
  }

  drawPlayer(coordinate, player) {
    const CELL_SIZE = this.state.CELL_SIZE;
    const mapContext = this.state.canvasContext;
    mapContext.fillStyle = player.color;
    mapContext.beginPath();
    mapContext.rect(
      (coordinate.x * CELL_SIZE) + 1, 
      (coordinate.y * CELL_SIZE) + 1, 
      CELL_SIZE - 2, 
      CELL_SIZE - 2);
    mapContext.fill();
    mapContext.closePath();
  }

  highlightPlayerMoves(coordinate) {
    const gameBoard = this.state.data;
    const CELL_SIZE = this.state.CELL_SIZE;
    const mapContext = this.state.canvasContext;
    mapContext.fillStyle = 'rgba(0,125,255,0.25)';
    gameBoard.getData(coordinate).data[0].availableMoves
      .forEach(move => {
        mapContext.beginPath();
        mapContext.rect(
          (move.x * CELL_SIZE) + 1, 
          (move.y * CELL_SIZE) + 1, 
          CELL_SIZE - 2, 
          CELL_SIZE - 2);
        mapContext.fill();
        mapContext.closePath();
      });
  }

  showAddPlayerModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.visibility = 'visible';
    modal.style.display = 'block';
  }

  addNewPlayer() {
    const gameBoard = this.state.data;
    const currentPlayers = this.state.players;
    const modal = document.getElementById(this.state.ADD_PLAYER_MODAL);
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
    currentPlayers.push({
      playerNum: (currentPlayers.length + 1),
      player: newPlayer,
    });
    this.setState({
      gameBoard: this.gameBoard,
      players: currentPlayers,
    });
    if(gameBoard.getActiveCell() === undefined){
      gameBoard.setActiveCell(gameBoard.getData(targetCell));
      gameBoard.activeCell.toggleActive();
    };
    this.drawPlayer(targetCell, newPlayer);
    this.props.addPlayerToGame(newPlayer);
    
    // debugging
    // console.log(gameBoard);
  }

  render() {
    return (
      <div>
        <canvas id='map' height={this.props.canvasHeight} 
            width={this.props.canvasWidth} onClick={this.handleClick}></canvas>
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <button className='nes-btn is-primary' onClick={ () => { this.showAddPlayerModal(this.state.ADD_PLAYER_MODAL) } }>Show Modal</button>
        </div>
        <AddPlayerModal id={ this.state.ADD_PLAYER_MODAL } addNewPlayer={ this.addNewPlayer }/>
      </div>
    )
  }
};
