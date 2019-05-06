// linter overrides
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';

// base style
import './Panel.css';

/**
 * Returns a basic Panel object for displaying game information and
 * other nested children.
 *
 * @param {props} props,
 * @return {div}
 */
export default function Panel(props) {
  const { width, children } = props;
  return (
    <div
      className='panel'
      style={{ width }}
    >
      { children }
    </div>
  );
}

/**
 * Panel propTypes
 */
Panel.propTypes = {
  width: PropTypes.number,
  children: PropTypes.node.isRequired,
};

/**
 * Default props
 */
Panel.defaultProps = {
  width: undefined,
};
