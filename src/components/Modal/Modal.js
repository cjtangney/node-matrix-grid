import { Component } from 'react'

import './style.css';

export default class Modal extends Component {
  getId() {
    let id;
    this.props.id === undefined ? id = ''  : id = this.props.id;
    return id;
  }

  hideModalOnBackdropClick(event) {
    const modal = event.target;
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  }

  hideModalById(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  }

  stopEventBubble(event) {
    event.stopPropagation();
  }
}
