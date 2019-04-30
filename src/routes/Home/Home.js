import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';
import Panel from '../../components/Panel';

import './style.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      playerTurn: undefined,
      activePlayer: undefined,
    };

    this.addPlayerToGame = this.addPlayerToGame.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.getCurrentPlayer = this.getCurrentPlayer.bind(this);
  }
  
  initializePlayers() {
    this.setState({
      playerTurn: 1,
    });
  }

  addPlayerToGame(newPlayer) {
    const tempPlayers = this.state.players;
    if(this.state.players.length === 0) { 
      this.initializePlayers(); 
      this.setState({
        activePlayer: newPlayer,
      });
    }
    if(!this.state.players.includes(newPlayer)) { 
      tempPlayers.push(newPlayer);
      this.setState({
        players: tempPlayers,
      });
    }
  }

  getCurrentPlayer() {
    return this.state.activePlayer;
  }

  nextTurn() {
    const currentTurn = this.state.playerTurn;
    if(currentTurn === this.state.players.length){
      this.setState({
        playerTurn: 1,
      })
      return;
    }
    this.setState({
      playerTurn: (currentTurn + 1),
    });
    return;
  }

  render() {
    return (
      <div>
        <Panel>
          <span className='nes-text'>
            ACTIVE CELL: { this.state.activeCell !== undefined ? 
                `x: ${ this.state.activeCell.x }; 
                    y: ${ this.state.activeCell.y }` : 
                '' }
          </span>
          <br /><br /><br />
          <span className='nes-text'>
              PLAYER TURN: { this.state.playerTurn }
          </span>
          <br /><br /><br />
          <button id='next-turn-button' className='nes-btn is-primary' onClick={ this.nextTurn }>Next Turn</button>
        </Panel>
        <GameBoard 
            boardX = { 10 }
            boardY = { 10 }
            canvasWidth = { 850 }
            canvasHeight = { 850 }
            addPlayerToGame = { this.addPlayerToGame } 
            playerTurn = { this.state.playerTurn } 
            getCurrentPlayer = {this.getCurrentPlayer } />
      </div>      
    );
  }
}
