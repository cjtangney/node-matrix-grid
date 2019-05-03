/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import GameBoard from '../../components/GameBoard';
import Panel from '../../components/Panel';

import './style.css';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      players: [],
      playerTurn: '',
      activePlayer: undefined,
    };

    this.addPlayerToGame = this.addPlayerToGame.bind(this);
    this.nextTurn = this.nextTurn.bind(this);
    this.getCurrentPlayer = this.getCurrentPlayer.bind(this);
  }

  getCurrentPlayer() {
    const { activePlayer } = this.state;
    return (activePlayer);
  }

  initializePlayers() {
    this.setState({
      playerTurn: 1,
    });
  }

  async addPlayerToGame(newPlayer) {
    const { players } = this.state;
    const tempPlayers = players;
    if (tempPlayers.length === 0) {
      this.initializePlayers();
      this.setState({
        activePlayer: newPlayer,
      });
    }
    if (!tempPlayers.includes(newPlayer)) {
      tempPlayers.push(newPlayer);
      this.setState({
        players: tempPlayers,
      });
    }
  }

  nextTurn() {
    const { playerTurn, players } = this.state;
    const currentTurn = playerTurn;
    if (currentTurn === players.length) {
      this.setState({
        playerTurn: 1,
        activePlayer: players[0],
      });
      return;
    }
    this.setState({
      playerTurn: (currentTurn + 1),
      activePlayer: players[currentTurn],
    });
  }

  render() {
    const { playerTurn } = this.state;
    return (
      <div>
        <Panel>
          <span className='nes-text'>
            {`PLAYER TURN: ${playerTurn}`}
          </span>
          <br />
          <br />
          <br />
          <button
            id='next-turn-button'
            type='button'
            className='nes-btn is-primary'
            onClick={this.nextTurn}
          >
            Next Turn
          </button>
        </Panel>
        <GameBoard
          boardX={10}
          boardY={10}
          canvasWidth={850}
          canvasHeight={850}
          addPlayerToGame={this.addPlayerToGame}
          playerTurn={playerTurn}
          currentPlayer={this.getCurrentPlayer()}
        />
      </div>
    );
  }
}
