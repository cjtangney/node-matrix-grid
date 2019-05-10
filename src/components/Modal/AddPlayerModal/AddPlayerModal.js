// linter overrides
/* eslint-disable jsx-quotes */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Modal from '../Modal';

/**
 * AddPlayerModal extends base Modal functionality and
 * allows users to add a Player object to the GameBoard
 *
 * Consider making this a functional component if possible?
 */
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
          {/** character details */}
          <section>
            <div className='nes-field'>
              <label htmlFor='player-name'>
                Name
                <input type='text' id='player-name' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-race'>
                Race
                <input type='text' id='player-race' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-class'>
                Class
                <input type='text' id='player-class' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-age'>
                Age
                <input type='number' id='player-age' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-weight'>
                Weight
                <input type='number' id='player-weight' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-height'>
                Height
                <input type='number' id='player-height' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-background'>
                Background
                <input type='text' id='player-background' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-alignment'>
                Alignment
                <input type='text' id='player-alignment' className='nes-input' />
              </label>
            </div>
            <div className='nes-field'>
              <label htmlFor='player-speed'>
                Speed
                <input type='number' id='player-speed' className='nes-input' />
              </label>
            </div>
          </section>
          {/** coordinates */}
          <section>
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
          </section>
          <br />
          {/** buttons */}
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
