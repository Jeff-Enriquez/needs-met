import React from 'react';
import styles from './Needs.module.css'

function Needs({ isUnmet, toggleIsUnmet }) {
  return (
    <>
      <div className={styles.btnContainer}>
        {isUnmet ? (
            <><button className={`${styles.button} ${styles.darkblue}`} >Unmet Needs</button>
            <button className={styles.button} onClick={toggleIsUnmet}>Met Needs</button></>
        ) : (
            <><button className={styles.button} onClick={toggleIsUnmet}>Unmet Needs</button>
            <button className={`${styles.button} ${styles.darkblue}`} id='needs-selected'>Met Needs</button></>
        )}
      </div>
      <main>
        <img src={process.env.PUBLIC_URL + '/images/sandals.png'} alt='profile'/>
        <p>This is a comment of what my posted need is.</p>
      </main>
    </> 
  );
}

export default Needs;
