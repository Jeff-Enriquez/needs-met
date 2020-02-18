import React from 'react';


function Footer() {
  return (
    <>
    <nav className='footer-nav'>
      <img src={process.env.PUBLIC_URL + '/images/home.jpeg'} alt='home' />
      <img src={process.env.PUBLIC_URL + '/images/message.png'} alt='message'/>
      <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='plus'/>
      <img src={process.env.PUBLIC_URL + '/images/bag.png'} alt='bag'/>
      <img src={process.env.PUBLIC_URL + '/images/hamburger.png'} alt='hamburger-icon'/>
    </nav>
    </> 
  );
}

export default Footer;
