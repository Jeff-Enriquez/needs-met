import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase';
import Need from '../../components/Need';
import RingLoader from "react-spinners/RingLoader";

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
      } else {
        setNeeds(<p>There are no needs</p>)
      }
    }
    asyncFunction()
  }, [])
  
  return (
    <main style={{margin: '0 10px 0 10px'}}>
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
  );
}

export default Needs;
