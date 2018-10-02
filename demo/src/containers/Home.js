import React from 'react';
import { withRouteData } from 'react-static';
//
import logoImg from '../logo.png';

class Home extends React.Component {
  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Welcome to</h1>
        <img src={logoImg} alt="" />
      </div>
    );
  }
}

export default withRouteData(Home);
