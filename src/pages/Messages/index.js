import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Messages.module.css'

const Messages = (props) => {
  const user= {}
  const id = 0
  return (
    <main className={styles.main}>
      <div className={styles.needsContainer}>
        <img src={user.photoURL ? user.photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
        <Link className={styles.a} to={`/messages/${id}`}>
          <div className={styles.infoContainer}>
            <p className={styles.name}>{`${user.firstName} ${user.lastName}`}</p>
          </div>
        </Link>
      </div>
    </main>
  )
}

export default Messages;