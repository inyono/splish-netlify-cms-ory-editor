import React from 'react';
import { Router, Link } from 'react-static';

import Routes from 'react-static-routes';

export const InnerApp = ({ RoutesComp = Routes }) => {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
      </nav>
      <div className="content">
        <RoutesComp />
      </div>
    </div>
  );
};

const App = props => {
  return (
    <Router {...props}>
      <InnerApp />
    </Router>
  );
};

export default App;
