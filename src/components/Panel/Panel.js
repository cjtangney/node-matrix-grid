/* eslint-disable react/jsx-filename-extension */
/* eslint-disable jsx-quotes */
import React from 'react';
import PropTypes from 'prop-types';

import './Panel.css';

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

Panel.propTypes = {
  width: PropTypes.number,
  children: PropTypes.node.isRequired,
};

Panel.defaultProps = {
  width: undefined,
};
