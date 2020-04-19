import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class One extends Component {
  render() {
    return (
      <div>
        <Link to='/main/one'>One组件</Link>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

export default One;