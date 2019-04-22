import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';
import Panel from '../../components/Panel';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Panel>
          A panel body.
        </Panel>
        <GameBoard 
            boardX = { 20 }
            boardY = { 20 }
            canvasWidth = { 2000 }
            canvasHeight = { 2000 }/>
      </div>
    );
  }
}
