import React from 'react'
import { Link } from 'react-router-dom';
import styles from './Need.module.css'

const Need = ({ id, summary, created, user }) => {
  // get user information here in use effect
  return (
    <div className={styles.needsContainer}>
      {user.photoURL ?
        <img src={user.photoURL} alt='profile'/>
        :
        <img src={process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
      }
      <Link className={styles.a} to={`/needs/${id}`}>
        <div className={styles.infoContainer}>
          <p className={styles.name}>{`${user.firstName} ${user.lastName}`}</p> <span>{ created }</span>
          <p>{ summary }</p>
        </div>
      </Link>
    </div>
  )
}

export default Need;