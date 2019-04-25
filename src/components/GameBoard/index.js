import React, { Component } from 'react'
import { GameBoard as Board } from './GameBoard';
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
      canvasWidth: props.canvasWidth,
      canvasHeight: props.canvasHeight,
      data: new Board(props.boardY, props.boardX),
      canvasContext: undefined,
    };

    // click handler
    this.handleClick = this.handleClick.bind(this);
    this.addPlayer = this.addPlayer.bind(this);
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
    mapContext.strokeStyle = 'white';
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

  handleClick(event) {
    const gameBoard = this.state.data;
    const CELL_SIZE = this.state.CELL_SIZE;
    const mapContext = this.state.canvasContext;
    const point = {
      x: Math.trunc(event.nativeEvent.offsetX / CELL_SIZE),
      y: Math.trunc(event.nativeEvent.offsetY / CELL_SIZE),
    };
    const currentCell = gameBoard.getData(point);
    const prevCell = gameBoard.getActiveCell();

    /**
     * If the GameBoard had a previous active cell, it must
     * be cleared and the outline must be redrawn.
     */
    if(prevCell !== undefined) {
      prevCell.toggleActive();
      prevCell.popContents();
      mapContext.clearRect(
        (prevCell.x * CELL_SIZE), 
        (prevCell.y * CELL_SIZE), 
        CELL_SIZE, 
        CELL_SIZE);
      mapContext.fillStyle = 'red';    
      mapContext.beginPath();
      mapContext.strokeRect(
        (prevCell.x * CELL_SIZE), 
        (prevCell.y * CELL_SIZE), 
        CELL_SIZE, 
        CELL_SIZE);
      mapContext.closePath();

      prevCell.neighbors.forEach(neighbor => {
        mapContext.clearRect(
          (neighbor.x * CELL_SIZE) + 1, 
          (neighbor.y * CELL_SIZE) + 1, 
          CELL_SIZE - 2, 
          CELL_SIZE - 2);
      });
    };

    /**
     * Fill the active cell.
     */
    mapContext.fillStyle = 'green';
    mapContext.beginPath();
    mapContext.rect(
      (currentCell.x * CELL_SIZE) + 1, 
      (currentCell.y * CELL_SIZE) + 1, 
      CELL_SIZE - 2, 
      CELL_SIZE - 2);
    mapContext.fill();
    mapContext.closePath();

    // Update the GameBoard active cell.
    gameBoard.setActiveCell(currentCell);
    this.props.updateActiveCell(currentCell);
    gameBoard.activeCell.toggleActive();
    
    // Put something into the cell.
    // gameBoard.activeCell.pushContents('A player is here!');

    /**
     * Fill the neighbors because why not.
     */
    mapContext.fillStyle = 'rgba(0,125,255,0.25)';
    gameBoard.activeCell.neighbors.forEach(neighbor => {
      mapContext.beginPath();
      mapContext.rect(
        (neighbor.x * CELL_SIZE) + 1, 
        (neighbor.y * CELL_SIZE) + 1, 
        CELL_SIZE - 2, 
        CELL_SIZE - 2);
      mapContext.fill();
      mapContext.closePath();
    });

    // debugging
    console.log(gameBoard);
  }

  addPlayer() {
    const targetCell = { x: 2, y: 1 };
    const gameBoard = this.state.data;
    gameBoard.getData(targetCell).pushContents(new Player({
        color: 'red',
        currentLocation: targetCell,
      })
    );
    this.drawPlayer(targetCell);
    this.highlightPlayerMoves(targetCell);
    // debugging
    console.log(gameBoard);
  }

  drawPlayer(coordinate) {
    const CELL_SIZE = this.state.CELL_SIZE;
    const mapContext = this.state.canvasContext;
    mapContext.fillStyle = 'green';
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

  render() {
    return (
      <div>
        <canvas id='map' height={this.props.canvasHeight} 
            width={this.props.canvasWidth} onClick={this.handleClick}></canvas>
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <button className='btn' onClick={this.addPlayer}> Add player </button>
        </div>
      </div>
    )
  }
};
