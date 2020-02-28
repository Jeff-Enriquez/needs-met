import React from 'react'
import { NavLink } from 'react-router-dom';
import styles from './Need.module.css'

const Need = ({ id, summary, created }) => {
  console.log(id)
  return (
    <div className={styles.needsContainer}>
      <img src={process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
      <NavLink className={styles.a} exact to={`/needs/${id}`}>
        <div className={styles.infoContainer}>
          <p>Name</p> <span>{ created }</span>
          <p>{ summary }</p>
        </div>
      </NavLink>
    </div>
  )
}

export default Need;