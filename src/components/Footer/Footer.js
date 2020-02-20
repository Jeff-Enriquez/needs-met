import React from 'react';
import styles from './Footer.module.css'

function Footer({ currentPage }) {
  return (
    <>
    <nav className={styles.nav}>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/home.jpeg'} alt='help'
          onClick={() => currentPage('help')}
        />
        <p className={styles.p}>Help Others</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/message.png'} alt='message'
          onClick={() => currentPage('messages')}
        />
        <p className={styles.p}>Messages</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='plus'
          onClick={() => currentPage('add a need')}
        />
        <p className={styles.p}>Add Need</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/bag.png'} alt='bag'
          onClick={() => currentPage('my needs')}
        />
        <p className={styles.p}>My Needs</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/hamburger.png'} alt='hamburger-icon'
          onClick={() => currentPage('more')}
        />
        <p className={styles.p}>More</p>
      </div>
    </nav>
    </> 
  );
}

export default Footer;
