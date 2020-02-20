import React from 'react';
import styles from './Needs.module.css'

function Needs({ isUnmet, toggleIsUnmet }) {
  return (
    <>
      {isUnmet ? (
        <div className={styles.btnContainer}>
          <button className={[styles.button, styles.darkblue].join(' ')} >Unmet Needs</button>
          <button className={styles.button} onClick={toggleIsUnmet}>Met Needs</button>
        </div>
      ) : (
        <div className={styles.btnContainer}>
          <button className={styles.button} onClick={toggleIsUnmet}>Unmet Needs</button>
          <button className={[styles.button, styles.darkblue].join(" ")} id='needs-selected'>Met Needs</button>
        </div>
      )}
      <main>
        <img src={process.env.PUBLIC_URL + '/images/sandals.png'} alt='profile'/>
        <p>This is a comment of what my posted need is.</p>
      </main>
    </> 
  );
}

export default Needs;
