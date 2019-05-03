/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Modal from '../Modal';

export default class AddPlayerModal extends Modal {
  constructor(props) {
    super(props);

    this.hideModalById = this.hideModalById.bind(this);
  }

  render() {
    return (
      <div
        id={this.getId()}
        className='modal-background'
        role='presentation'
        onClick={this.hideModalOnBackdropClick}
      >
        <div
          className='modal'
          role='presentation'
          onClick={this.stopEventBubble}
        >
          <h2>New Player...</h2>
          <br />
          <div className='nes-field'>
            <label htmlFor='player-start-x'>
              X-coordinate
              <input type='text' id='player-start-x' className='nes-input' />
            </label>
          </div>
          <div className='nes-field'>
            <label htmlFor='player-start-y'>
              Y-coordinate
              <input type='text' id='player-start-y' name='player-start-y' className='nes-input' />
            </label>
          </div>
          <br />
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <button
              type='button'
              className='nes-btn is-success'
              onClick={this.props.addNewPlayer}
            >
              Okay
            </button>
            <button
              type='button'
              className='nes-btn is-error'
              onClick={() => { this.hideModalById(this.getId()); }}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
