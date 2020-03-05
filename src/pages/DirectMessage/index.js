import React, { useState, useEffect, useRef } from 'react';
import Firebase from '../../services/Firebase/firebase';
import { Link } from 'react-router-dom';
import styles from './DirectMessage.module.css';

const DirectMessage = (props) => {
  const id = props.computedMatch.params.id
  const { currentUser } = props
  const [message, setMessage] = useState('')
  const [renderMessages, setMessages] = useState(<></>)
  const [chatId, setChatId] = useState(null)
  const [isError, setIsError] = useState(false)
  const [user2, setUser2] = useState({})
  const messagesEndRef = useRef(null)

  useEffect(() => {
    const asyncFunction = async () => {
      let user2 = {}
      try {
        user2 = await Firebase.getUserById(id)
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
        setChatId(chatId)
        setUser2(user2)

        Firebase.database.collection("Chats").doc(chatId)
        .onSnapshot((doc) => {
          const docInfo = doc.data()
          const userData = docInfo[id]
          const currentUserData = docInfo[currentUser.id]
          const allMessages = merge(currentUserData, userData)
          setMessages(
            <>
            {allMessages}
            </>
          )
        });
      } catch(error) {
        setIsError(true)
      }
    }
    asyncFunction()
    return
  }, [])

  useEffect(scrollToBottom, [renderMessages])

  const sendMessage = async e => {
    e.preventDefault()
    Firebase.addMessage(currentUser.id, chatId, message)
    setMessage('')
  }

  function scrollToBottom () {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }

  const merge = (arr1, arr2) => {
    let merged = [];
    let index1 = 0;
    let index2 = 0;
    let current = 0;
  
    while (current < (arr1.length + arr2.length)) {
      let isArr1Depleted = index1 >= arr1.length;
      let isArr2Depleted = index2 >= arr2.length;
      if (!isArr1Depleted && (isArr2Depleted || (arr1[index1].created < arr2[index2].created))) {
        merged[current] = <p className={`${styles.message} ${styles.currentUserMessage}`} key={current}>{arr1[index1].message}</p>;
        index1++;
      } else {
      merged[current] = <p className={`${styles.message} ${styles.userMessage}`} key={current}>{arr2[index2].message}</p>;
        index2++;
      }
      current++;
    }
    return merged;
  }

  return (
    <>
      <div className={styles.contactBar}>
        <Link to='/messages' className={styles.arrow}>&#8592;</Link>
        {user2.firstName && 
          <>
          <img className={styles.pic} src={user2.photoURL ? user2.photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
          <p className={styles.name}>{`${user2.firstName} ${user2.lastName}`}</p>
          </>
        }
        </div>
      <div className={styles.chatBox}>
        { isError ? 
          <p>Sorry, the user you are attempting to message does not exist</p>
          :
          <>
          {renderMessages}
          </>
        }
        <div className={styles.endRef} ref={messagesEndRef} />
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