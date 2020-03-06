import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase';
import Need from '../../components/Need';
import RingLoader from "react-spinners/RingLoader";
import styles from './Needs.module.css';

const Needs = ({ currentUser }) => {
  const [needs, setNeeds] = useState(null)
  const [needHistory, setNeedHistory] = useState(null)
  const [limit] = useState(10)

  useEffect(() => { 
    const asyncFunction = async () => {
      const firstNeed = await Firebase.getFirstNeed()
      if (firstNeed === undefined) {
        setNeeds(<p>There are no needs</p>)
      } else {
        const [ needs, lastDoc ] = await Firebase.getNeedsAt(firstNeed, limit)
        setNeedHistory([ firstNeed, lastDoc])
        if(needs) {
          setNeeds(needs.map((need, i) => (
            <Need key={i} id={need.id} summary={need.summary} 
              created={need.created} user={need.user}
            />
          )))
        } else {
          setNeeds(<p>There are no needs</p>)
        }
      }
    }
    asyncFunction()
  }, [])

  const nextNeeds = async () => {
    if (needHistory) {
      const [ needs, lastDoc ] = await Firebase.getNeedsAfter(needHistory[needHistory.length - 1], limit)
      if (lastDoc) {
        setNeedHistory(needHistory => {return [...needHistory, lastDoc]})
        if(needs) {
          setNeeds(needs.map((need, i) => (
            <Need key={i} id={need.id} summary={need.summary} 
              created={need.created} user={need.user}
            />
          )))
        }
      }
    }
  }

  const prevNeeds = async () => {
    if (needHistory && needHistory.length - 3 >= 0) {
      setNeeds(null)
      let needs, lastDoc
      if (needHistory.length - 3 === 0) {
        [ needs, lastDoc ] = await Firebase.getNeedsAt(needHistory[needHistory.length - 3], limit)
      } else {
        [ needs, lastDoc ] = await Firebase.getNeedsAfter(needHistory[needHistory.length - 3], limit)
      }
      const newHistory = []
      for (let i = 0; i < needHistory.length - 2; i++ ) {
        newHistory.push(needHistory[i])
      }
      newHistory.push(lastDoc)
      setNeedHistory(newHistory)
      if(needs) {
        setNeeds(needs.map((need, i) => (
          <Need key={i} id={need.id} summary={need.summary} 
            created={need.created} user={need.user}
          />
        )))
      }
    }
  }

  return (
    <>
    <div className={styles.btnContainer}>
      <button className={styles.button} onClick={() => prevNeeds()}>{'<-- Prev'}</button>
      <button className={styles.button} onClick={() => nextNeeds()}>{'Next -->'}</button>
    </div>
    <main className={styles.main}>
      {needs ? (
        <>
        {needs}
        </>
      ) : (
        <RingLoader
          css={{margin: '20px auto'}}
          size={35}
          color='lightblue'
        />
      )}
    </main>
    </>
  );
}

export default Needs;