import React from 'react';
import styles from './Needs.module.css'

const Needs = ({ isUnmet, toggleIsUnmet }) => {
  return (
    <>
      <div className={styles.fixBtns}>
        <div className={styles.btnContainer}>
          {isUnmet ? (
              <><button className={`${styles.button} ${styles.lightblue}`} >Unmet Needs</button>
              <button className={styles.button} onClick={toggleIsUnmet}>Met Needs</button></>
          ) : (
              <><button className={styles.button} onClick={toggleIsUnmet}>Unmet Needs</button>
              <button className={`${styles.button} ${styles.lightblue}`} id='needs-selected'>Met Needs</button></>
          )}
        </div>
      </div>
      <main className={styles.main}>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile1.jpg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile2.jpeg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile2.jpeg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile1.jpg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile2.jpeg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile2.jpeg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile1.jpg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile2.jpeg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile2.jpeg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile1.jpg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
        <div className={styles.needsContainer}>
          <img src={process.env.PUBLIC_URL + '/images/profile1.jpg'} alt='profile'/>
          <p>This is a comment of what my posted need is.</p>
        </div>
      </main>
    </> 
  );
}

export default Needs;
