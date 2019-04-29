import React from 'react';
import Modal from '../Modal';

export default class AddPlayerModal extends Modal {
  constructor(props) {
    super(props);

    this.hideModalById = this.hideModalById.bind(this);
  }

  render() {
    return (
      <div id={ this.getId() } className='modal-background' onClick={ 
          this.hideModalOnBackdropClick }>
        <div className='modal' onClick={ this.stopEventBubble }>
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
            <button className='nes-btn is-success' onClick={ 
                this.props.addNewPlayer }>
              Okay
            </button>
            <button className='nes-btn is-error' onClick={ 
                () => { this.hideModalById(this.getId()) } }>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}
