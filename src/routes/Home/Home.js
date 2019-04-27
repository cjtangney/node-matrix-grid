import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';
import Panel from '../../components/Panel';
import Modal from '../../components/Modal';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCell: undefined,
    };

    this.updateActiveCell = this.updateActiveCell.bind(this);
  }
  
  updateActiveCell(cell) {
    this.setState({
      activeCell: cell,
    });
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
      </div>      
    );
  }
}
