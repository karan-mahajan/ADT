import React from 'react';
import { pagePath } from '../../utils/constants';
import './nomatch.scss';

function Nomatch() {
  return (
    <div className="no-match-container">
      <h1>This page isn&#39;t available</h1>
      <p>The requested URL was not found on this server.</p>
      <a href={pagePath.HOME} className="btn">
        Home
      </a>
    </div>
  );
}

export default Nomatch;
