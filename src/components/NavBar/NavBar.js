import React from 'react';
import './NavBar.css';
import dots from './dots.png'
import sandals from './sandals.png'

function NavBar() {
  return (
    <nav>
      <div>
        <div id='c-container'>
          <img id="c-logo" src={sandals} alt='church logo'/>
          <h1>Church Name</h1>
        </div>
      </div>
      <img id='dots' src={dots} />
    </nav>
  );
}

export default NavBar;
