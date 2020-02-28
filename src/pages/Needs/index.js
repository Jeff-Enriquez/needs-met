import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase'
import Need from '../../components/Need';
import styles from './Needs.module.css'

const Needs = ({ isUnmet, toggleIsUnmet }) => {
  const [needs, setNeeds] = useState(null)

  useEffect(() => { 
    const asyncFunction = async () => {
      const needs = await Firebase.getAllUnmetNeeds()
      if(needs) {
        setNeeds(needs.map((need, i) => (
          <Need key={i} id={need.id} summary={need.summary} created={need.created}/>
        )))
      }
    }
    asyncFunction()
  }, [])
  
  return (
    <>
      <div className={styles.fixBtns}>
        <div className={styles.btnContainer}>
          {isUnmet ? (
              <><button className={`${styles.button} ${styles.blue}`} >Unmet Needs</button>
              <button className={styles.button} onClick={toggleIsUnmet}>Met Needs</button></>
          ) : (
              <><button className={styles.button} onClick={toggleIsUnmet}>Unmet Needs</button>
              <button className={`${styles.button} ${styles.blue}`} id='needs-selected'>Met Needs</button></>
          )}
        </div>
      </div>
      <main className={styles.main}>
        {needs ? (
          <>
          {needs}
          </>
        ) : (
          <p>There are no needs</p>
        )}
      </main>
    </> 
  );
}

export default Needs;
