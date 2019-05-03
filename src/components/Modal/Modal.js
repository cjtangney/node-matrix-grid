/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import PropTypes from 'prop-types';

import './style.css';

export default class Modal extends Component {
  getId() {
    const { id } = this.props;
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

Modal.propTypes = {
  id: PropTypes.string,
};

Modal.defaultProps = {
  id: '',
};
