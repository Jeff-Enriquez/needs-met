import React from 'react'
import styles from './Need.module.css'

const Need = ({ summary }) => {
  return (
    <div className={styles.needsContainer}>
      <img src={process.env.PUBLIC_URL + '/images/profile1.jpg'} alt='profile'/>
      <p>{ summary }</p>
    </div>
  )
}

export default Need;