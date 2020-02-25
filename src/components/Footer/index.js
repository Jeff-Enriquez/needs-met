import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css'

function Footer({ pathname }) {
  return (
    <>
    <div className={styles.margin}></div>
    <nav className={styles.nav}>
      <NavLink className={styles.a} exact to='/'>
        <div>
          <img src={pathname === '/' ? process.env.PUBLIC_URL + '/images/help.png' : process.env.PUBLIC_URL + '/images/help-gray.png'} alt='help'/>
          <p className={styles.p} style={pathname === '/' ?  {color: '#FFFFFF'} : {color: '#B3B3B3'}}>Help Others</p>
        </div>
      </NavLink>
      <NavLink className={styles.a} exact to='/messages'>
        <div>
          <img src={pathname === '/messages' ? process.env.PUBLIC_URL + '/images/message.png' : process.env.PUBLIC_URL + '/images/message-gray.png'} alt='message'/>
          <p className={styles.p} style={pathname === '/messages' ?  {color: '#FFFFFF'} : {color: '#B3B3B3'}}>Messages</p>
        </div>
      </NavLink>
      <NavLink className={styles.a} exact to='/add-a-need'>
        <div>
          <img src={pathname === '/add-a-need' ? process.env.PUBLIC_URL + '/images/plus.png' : process.env.PUBLIC_URL + '/images/plus-gray.png'} alt='plus'/>
          <p className={styles.p} style={pathname === '/add-a-need' ?  {color: '#FFFFFF'} : {color: '#B3B3B3'}}>Add Need</p>
        </div>
      </NavLink>
      <NavLink className={styles.a} exact to='/my-needs'>
        <div>
          <img src={pathname === '/my-needs' ? process.env.PUBLIC_URL + '/images/bag.png' : process.env.PUBLIC_URL + '/images/bag-gray.png'} alt='bag'/>
          <p className={styles.p} style={pathname === '/my-needs' ?  {color: '#FFFFFF'} : {color: '#B3B3B3'}}>My Needs</p>
        </div>
      </NavLink>
      <NavLink className={styles.a} exact to='/more'>
        <div>
          <img src={pathname === '/more' ? process.env.PUBLIC_URL + '/images/hamburger.png' : process.env.PUBLIC_URL + '/images/hamburger-gray.png'} alt='hamburger-icon'/>
          <p className={styles.p} style={pathname === '/more' ? {color: '#FFFFFF'} : {color: '#B3B3B3'} }>More</p>
        </div>
      </NavLink>
    </nav>
    </> 
  );
}

export default Footer;
