import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';
import Player from '../../components/Player';
import Panel from '../../components/Panel';
import Modal from '../../components/Modal';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      activeCell: undefined,
    };

    this.updateActiveCell = this.updateActiveCell.bind(this);
    this.addNewPlayer = this.addNewPlayer.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }
  
  updateActiveCell(cell) {
    this.setState({
      activeCell: cell,
    });
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.visibility = 'visible';
    modal.style.display = 'block';
  }

  hideModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  }

  addNewPlayer() {
    // something should be added to allow random placement
    // of a player on the board (click listener, text box, etc)
    const targetCell = {
      x: document.getElementById('player-start-x').value,
      y: document.getElementById('player-start-y').value,
    };
    console.log(targetCell);
    // const gameBoard = this.state.data;
    // gameBoard.getData(targetCell).pushContents(new Player({
    //     color: 'red',
    //     currentLocation: targetCell,
    //   })
    // );
    // this.drawPlayer(targetCell);
    // this.highlightPlayerMoves(targetCell);
    // // debugging
    // console.log(gameBoard);
  }

  render() {
    return (
      <div>
        <Panel width={ 850 }>
          <span className='nes-text'>
            ACTIVE CELL: { this.state.activeCell !== undefined ? 
                `x: ${ this.state.activeCell.x }; 
                    y: ${ this.state.activeCell.y }` : 
                '' }
          </span>
        </Panel>
        <GameBoard 
            boardX = { 10 }
            boardY = { 10 }
            canvasWidth = { 850 }
            canvasHeight = { 850 }
            updateActiveCell = { this.updateActiveCell } />
        <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
          <button className='nes-btn is-primary' onClick={ () => { this.showModal('home-modal') } }>Show Modal</button>
        </div>
        <Modal id='home-modal'>
          <h2>New Player...</h2>
          <br />
          <div className='nes-field'>
            <label htmlFor='player-start-x'>X-coordinate</label>
            <input type='text' id='player-start-x' className='nes-input' />
          </div>
          <div className='nes-field'>
            <label htmlFor='player-start-y'>Y-coordinate</label>
            <input type='text' id='player-start-y' className='nes-input' />
          </div>
          <br />
          <div style={{ 'display': 'flex', 'justifyContent': 'center' }}>
            <button className='nes-btn is-success' onClick={ this.addNewPlayer }>Okay</button>
            <button className='nes-btn is-error' onClick={ () => { this.hideModal('home-modal') } }>Cancel</button>
          </div>
        </Modal>
      </div>      
    );
  }
}
