import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase';
import Need from '../../components/Need';
import RingLoader from "react-spinners/RingLoader";
import styles from './MyNeeds.module.css';

function MyNeeds({ currentUser }) {
  const [myNeeds, setMyNeeds] = useState(null)
  useEffect(() => {
    const asyncFunction = async () => {
      const needs = await Firebase.getMyNeeds(currentUser.id)
      if(needs) {
        setMyNeeds(needs.map((need, i) => (
          <Need key={i} id={need.id} summary={need.summary} 
            created={need.created} user={currentUser}
          />
        )))
      } else {
        setMyNeeds(<p>There are no needs</p>)
      }
    }
    asyncFunction()
  }, [])
  
  return (
    <main style={{margin: '0 10px 0 10px'}}>
      {myNeeds ? (
        <>
        {myNeeds}
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

export default MyNeeds;
