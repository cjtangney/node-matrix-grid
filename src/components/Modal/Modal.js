import React from 'react'

import './style.css';

export default function Modal(props) {
  const setId = function() {
    let id;
    props.id === undefined ? id = ''  : id = props.id;
    return id;
  }

  const hideModal = function(event) {
    const modal = event.target;
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  }

  const stopEventBubble = function(event) {
    event.stopPropagation();
  }

  return (
    <div id={ setId() } className='modal-background' onClick={ hideModal }>
      <div className='modal' onClick={ stopEventBubble }>
        { props.children }
      </div>
    </div>
  )
}
