import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase'
import Need from '../../components/Need';
import styles from './Needs.module.css'

const Needs = ({ currentUser }) => {
  const [needs, setNeeds] = useState(null)

  useEffect(() => { 
    const asyncFunction = async () => {
      const needs = await Firebase.getNeeds()
      if(needs) {
        setNeeds(needs.map((need, i) => (
          <Need key={i} id={need.id} summary={need.summary} 
            created={need.created} user={need.user}
          />
        )))
      }
    }
    asyncFunction()
  }, [])
  
  return (
    <main className={styles.main}>
      {needs ? (
        <>
        {needs}
        </>
      ) : (
        <p>There are no needs</p>
      )}
    </main>
  );
}

export default Needs;
