import React from 'react';

function Header() {
  return (
    <>
    <nav className='header-nav'>
      <div>
        <div id='h-container'>
          <img id="h-logo" src={process.env.PUBLIC_URL + '/images/sandals.png'} alt='church logo'/>
          <h1>Church Name</h1>
        </div>
      </div>
      <img id='dots' src={process.env.PUBLIC_URL + '/images/dots.png'} alt='hamburger icon' />
    </nav>
    </> 
  );
    // <div id='menu-container'>
    //   <h2>Name</h2>
    //   <h2>Messages</h2>
    //   <h2>Post A Need</h2>
    //   <h2>Select A Church</h2>
    // </div> 
}

export default Header;
