import React, { Component } from 'react';
import GameBoard from './components/GameBoard';

class App extends Component {
  render() {
    return (
      <div className="App">
        <GameBoard 
            boardX = { 20 }
            boardY = { 20 }
            canvasWidth = { 2000 }
            canvasHeight = { 2000 }/>
      </div>
    );
  }
}

export default App;
