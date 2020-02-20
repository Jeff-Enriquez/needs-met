import React from 'react';
import styles from './Header.module.css';

function Header() {
  return (
    <>
    <nav className={styles.nav}>
      <div>
        <div className={styles.container}>
          <img className={styles.logo} src={process.env.PUBLIC_URL + '/images/sandals.png'} alt='church logo'/>
          <h1>Church Name</h1>
        </div>
      </div>
      <img className={styles.dots} src={process.env.PUBLIC_URL + '/images/dots.png'} alt='hamburger icon' />
    </nav>
    </> 
  );
}

export default Header;
