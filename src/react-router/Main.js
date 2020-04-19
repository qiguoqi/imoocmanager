import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Main extends Component {
  render() {
    return (
      <div>
        <h2>Main组件</h2>
        <Link to='/main/one'>main组件</Link>
        <hr/>
        {this.props.children}
      </div>
    );
  }
}

export default Main;