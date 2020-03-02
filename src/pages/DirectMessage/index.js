import React, { useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase';
import { Link } from 'react-router-dom';
import styles from './DirectMessage.module.css'
const DirectMessage = (props) => {
  const id = props.computedMatch.params.id
  const { currentUser } = props
  const user = {}
  useEffect(() => {
    const asyncFunction = async () => {
      const user2Chats = await Firebase.getUserChats(id)
      let chatId = '';
      user2Chats.forEach((u2Chat) => {
        currentUser.chats.forEach((u1Chat) => {
          if(u1Chat === u2Chat){
            chatId = u1Chat;
          }
        })
      })
      if(chatId){
        const chat = await Firebase.getChat(chatId)
        console.log('get chat', chat)
      } else {
        const chatRef = await Firebase.createChat(currentUser.id, id)
        const chat = await Firebase.getChat(chatRef.id)
      }
    }
    asyncFunction()
  }, [])
  return (
    <>
      <div className={styles.contactBar}>
        <Link to='/messages' className={styles.arrow}>&#8592;</Link>
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