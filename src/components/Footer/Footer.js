import React from 'react';
import styles from './Footer.module.css'

function Footer() {
  return (
    <>
    <nav className={styles.nav}>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/home.jpeg'} alt='home' />
        <p className={styles.p}>Help Others</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/message.png'} alt='message'/>
        <p className={styles.p}>Messages</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='plus'/>
        <p className={styles.p}>Add Need</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/bag.png'} alt='bag'/>
        <p className={styles.p}>My Needs</p>
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/hamburger.png'} alt='hamburger-icon'/>
        <p className={styles.p}>More</p>
      </div>
    </nav>
    </> 
  );
}

export default Footer;
