import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';
import Panel from '../../components/Panel';

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
        <Panel width={ 900 }>
          ACTIVE CELL: {this.state.activeCell !== undefined ? 
              `x: ${this.state.activeCell.x}; y: ${this.state.activeCell.y}` : 
              ''}
        </Panel>
        <GameBoard 
            boardX = { 10 }
            boardY = { 10 }
            canvasWidth = { 900 }
            canvasHeight = { 900 }
            updateActiveCell = { this.updateActiveCell } />
      </div>
    );
  }
}
