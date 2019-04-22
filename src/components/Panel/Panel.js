import React, { Component } from 'react';
import './Panel.css';

export default class Panel extends Component {
  render() {
    return (
      <div className='panel' style={{'width': this.props.width}}>
        {this.props.children}
      </div>
    );
  }
}
