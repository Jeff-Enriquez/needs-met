import React from 'react'
import styles from './Need.module.css'

const Need = ({ summary }) => {
  return (
    <div className={styles.needsContainer}>
      <img src={process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
      <div>
        <p>Name</p>
        <p>{ summary }</p>
      </div>
    </div>
  )
}

export default Need;