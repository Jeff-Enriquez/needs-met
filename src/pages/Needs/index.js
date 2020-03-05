import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase';
import Need from '../../components/Need';
import RingLoader from "react-spinners/RingLoader";

const Needs = ({ currentUser }) => {
  const [needs, setNeeds] = useState(null)
  const [startNeed, setStartNeed] = useState(null)
  const [limit] = useState(2)

  useEffect(() => { 
    const asyncFunction = async () => {
      const firstNeed = await Firebase.getFirstNeed()
      const [ needs, lastDoc ] = await Firebase.getNeedsAt(firstNeed, limit)
      setStartNeed(lastDoc)
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
    asyncFunction()
  }, [])

  const nextNeeds = async () => {
    const [ needs, lastDoc ] = await Firebase.getNeedsAfter(startNeed, limit)
    setStartNeed(lastDoc)
    if(needs) {
      setNeeds(needs.map((need, i) => (
        <Need key={i} id={need.id} summary={need.summary} 
          created={need.created} user={need.user}
        />
      )))
    }
  }
  
  return (
    <main style={{margin: '0 10px 0 10px'}}>
      {needs ? (
        <>
        {needs}
        <button onClick={() => nextNeeds()}>Next Needs</button>
        </>
      ) : (
        <RingLoader
          css={{margin: '20px auto'}}
          size={35}
          color='lightblue'
        />
      )}
    </main>
  );
}

export default Needs;
