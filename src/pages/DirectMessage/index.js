import React, { useState, useEffect } from 'react';
import Firebase from '../../services/Firebase/firebase';
import { Link, Redirect } from 'react-router-dom';
import styles from './DirectMessage.module.css'
const DirectMessage = (props) => {
  const id = props.computedMatch.params.id
  const { currentUser } = props

  const [message, setMessage] = useState('')
  const [renderMessages, setMessages] = useState(<></>)
  const [chatId, setChatId] = useState(null)
  const [chat, setChat] = useState(null)
  const [isError, setIsError] = useState(false)
  const [user2, setUser2] = useState({})

  useEffect(() => {
    const asyncFunction = async () => {
      let user2 = {}
      try {
        user2 = await Firebase.getUserById(id)
        
      } catch(error) {
        setIsError(true)
      }
      let chatId = null;
      user2.chats.forEach((u2Chat) => {
        currentUser.chats.forEach((u1Chat) => {
          if(u1Chat === u2Chat){
            chatId = u1Chat;
          }
        })
      })
      if(!chatId){
        chatId = await Firebase.createChat(currentUser.id, id)
      }
      const chat = await Firebase.getChat(chatId)
      setChat(chat)
      setChatId(chatId)
      setUser2(user2)
    }
    asyncFunction()
  }, [])

  const sendMessage = async e => {
    e.preventDefault()
    Firebase.addMessage(currentUser.id, chatId, message)
    setMessage('')
  }

  useEffect(() => {
    if(chat) {
      const currentUserMessages = chat[currentUser.id]
      const user2Messages = chat[id]
      const allMessages = merge(currentUserMessages, user2Messages)
      setMessages(
        <>
        {allMessages}
        </>
      )
    }
  }, [chat])

  const merge = (arr1, arr2) => {
    let merged = [];
    let index1 = 0;
    let index2 = 0;
    let current = 0;
  
    while (current < (arr1.length + arr2.length)) {
      let isArr1Depleted = index1 >= arr1.length;
      let isArr2Depleted = index2 >= arr2.length;
      let i = 0;
      if (!isArr1Depleted && (isArr2Depleted || (arr1[index1].created < arr2[index2].created))) {
        merged[current] = <p className={`${styles.message} ${styles.currentUserMessage}`} key={i}>{arr1[index1].message}</p>;
        index1++;
        i++;
      } else {
      merged[current] = <p className={`${styles.message} ${styles.userMessage}`} key={i}>{arr2[index2].message}</p>;
        index2++;
        i++;
      }
      current++;
    }
    return merged;
  }

  return (
    <>
      <div className={styles.contactBar}>
        <Link to='/messages' className={styles.arrow}>&#8592;</Link>
        <img className={styles.pic} src={user2.photoURL ? user2.photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
        <p className={styles.name}>{ user2 && `${user2.firstName} ${user2.lastName}`}</p>
      </div>
      <div className={styles.chatBox}>
      { isError ? 
        <p>Sorry, the user you are attempting to message does not exist</p>
        :
        renderMessages
      }
      </div>
      <form className={styles.inputContainer} onSubmit={sendMessage}>
        <input className={styles.input} type='text' placeholder='Type your message here!' value={message} onChange={e => setMessage(e.target.value)}/>
        <button className={styles.button} type='submit'>
          <img className={styles.img} src={`${process.env.PUBLIC_URL}/images/arrow.svg`} alt='arrow'/>
        </button>
      </form>
    </>
  )
}

export default DirectMessage;