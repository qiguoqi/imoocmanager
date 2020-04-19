import { Link } from 'react-router-dom';
import React from 'react';

const Home = (props) => {
  return (
    <div>
      <Link to='/main'>Main组件</Link>
      <Link to='/topic'>Topic组件</Link>
      <Link to='/list'>List组件</Link>
      <hr/>
      {props.children}
    </div>
  )
}

export default Home;