import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import styles from './Messages.module.css'

const Messages = ({ users }) => {
  const [renderUsers, setRenderUsers] = useState(null)
  useEffect(() => {
    const render = []
    let i = 0;
    users.forEach((user) => {
      render.push(
        <div className={styles.needsContainer}>
          <img src={user.user.photoURL ? user.user.photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
          <Link key={i} className={styles.a} to={`/messages/${user.uid}`}>
            <div className={styles.infoContainer}>
              <p className={styles.name}>{`${user.user.firstName} ${user.user.lastName}`}</p>
            </div>
          </Link>
        </div>
      )
      i++;
    })
    setRenderUsers(render)
  }, [])

  return (
    <main className={styles.main}>
      {renderUsers ?
        <>
        {renderUsers}
        </>
        :  
        <></>
      }
    </main>
  )
}

export default Messages;