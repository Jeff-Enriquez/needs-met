import React from 'react';
import styles from './DirectMessage.module.css'
const DirectMessage = ({ currentUser, user }) => {
  return (
    <>
      <div className={styles.contactBar}>
        <img className={styles.pic} src={user.photoURL ? user.photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
        <p className={styles.name}>User Name</p>
      </div>
      <div className={styles.chatBox}>
        <p className={`${styles.message} ${styles.currentUserMessage}`}>Current User Message</p>
        <p className={`${styles.message} ${styles.userMessage}`}>User Message</p>
        <p className={`${styles.message} ${styles.currentUserMessage}`}>Current User Message</p>
        <p className={`${styles.message} ${styles.userMessage}`}>User Message</p>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.input} placeholder='Type your message here!'/>
        <img className={styles.img} src={`${process.env.PUBLIC_URL}/images/arrow.svg`} />
      </div>
    </>
  )
}

export default DirectMessage;