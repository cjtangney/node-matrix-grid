import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';

export default class Home extends Component {
  render() {
    return (
      <GameBoard 
          boardX = { 20 }
          boardY = { 20 }
          canvasWidth = { 2000 }
          canvasHeight = { 2000 }/>
    );
  }
}
