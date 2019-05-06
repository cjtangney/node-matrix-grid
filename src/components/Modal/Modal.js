// linter overrides
/* eslint-disable class-methods-use-this */
import { Component } from 'react';
import PropTypes from 'prop-types';

// base style
import './style.css';

/**
 * Functional component that provides an interface for extending
 * various Modals. Assigns ID to and handles closing the Modal.
 */
export default class Modal extends Component {
  getId() {
    const { id } = this.props;
    return id;
  }

  /**
   * Hides the Modal when the backdrop is selected
   *
   * @param {event} event,
   */
  hideModalOnBackdropClick(event) {
    const modal = event.target;
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  }

  /**
   * Hides the Modal using the Modal ID
   *
   * @param {string} modalId,
   */
  hideModalById(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.visibility = 'hidden';
    modal.style.display = 'none';
  }

  /**
   * Prevents click events on children from bubbling out to
   * hideModalOnBackdropClick()
   *
   * @param {event} event,
   */
  stopEventBubble(event) {
    event.stopPropagation();
  }
}

/**
 * Expected propTpes
 */
Modal.propTypes = {
  id: PropTypes.string,
};

/**
 * Default props
 */
Modal.defaultProps = {
  id: '',
};
