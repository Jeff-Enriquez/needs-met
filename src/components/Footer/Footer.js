import React from 'react';


function Footer() {
  return (
    <>
    <nav className='footer-nav'>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/home.jpeg'} alt='home' />
        <p className='footer-p'>Help Others</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/message.png'} alt='message'/>
        <p className='footer-p'>Messages</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='plus'/>
        <p className='footer-p'>Add Need</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/bag.png'} alt='bag'/>
        <p className='footer-p'>My Needs</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/hamburger.png'} alt='hamburger-icon'/>
        <p className='footer-p'>More</p>
      </div>
    </nav>
    </> 
  );
}

export default Footer;
