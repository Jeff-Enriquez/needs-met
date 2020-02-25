import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css'

function Footer() {
  return (
    <>
    <div className={styles.margin}></div>
    <nav className={styles.nav}>
      <NavLink exact to='/'>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/help.png'} alt='help'/>
          <p className={styles.p}>Help Others</p>
        </div>
      </NavLink>
      <NavLink exact to='/messages'>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/message.png'} alt='message'/>
          <p className={styles.p}>Messages</p>
        </div>
      </NavLink>
      <NavLink exact to='/add-a-need'>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/plus.png'} alt='plus'/>
          <p className={styles.p}>Add Need</p>
        </div>
      </NavLink>
      <NavLink exact to='/my-needs'>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/bag.png'} alt='bag'/>
          <p className={styles.p}>My Needs</p>
        </div>
      </NavLink>
      <NavLink exact to='/more'>
        <div>
          <img src={process.env.PUBLIC_URL + '/images/hamburger.png'} alt='hamburger-icon'/>
          <p className={styles.p}>More</p>
        </div>
      </NavLink>
    </nav>
    </> 
  );
}

export default Footer;
