import React, { useEffect, useState } from 'react';
import Firebase from '../../services/Firebase/firebase';
import { Link, Redirect } from 'react-router-dom';
import styles from './NeedDetail.module.css';
import RingLoader from "react-spinners/RingLoader";

const NeedDetail = (props) => {
  const { currentUser } = props;
  const needId = props.computedMatch.params.id
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [summary, setSummary] = useState('')
  const [details, setDetails] = useState('')
  const [created, setCreated] = useState('')
  const [userId, setUserId] = useState('')
  const [isDeleteModal, setIsDeleteModal] = useState (false)
  const [isDeleted, setIsDeleted] = useState(false)

  useEffect(() => {
    const asyncFunction = async () => {
      const { firstName, lastName, photoURL } = await Firebase.getUserByNeed(needId)
      setFirstName(firstName)
      setLastName(lastName)
      setPhotoURL(photoURL)
      const { summary, details, created, userId } = await Firebase.getANeed(needId)
      setUserId(userId)
      setSummary(summary)
      setDetails(details)
      setCreated(created.toDate().toString().slice(0,21))
    }
    asyncFunction()
  }, [])

  const confirmDelete = () => {
    if(currentUser.id === userId) {
      Firebase.deleteNeed(needId)
      setIsDeleted(true)
    }
  }

  return (
    <>
    {isDeleted && <Redirect to='/my-needs' />}
    <main className={styles.main}>
    {firstName ? 
      <>
      <div className={styles.profContainer}>
        <img className={styles.img} src={photoURL ? photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
        <h1 className ={styles.h1}>{firstName} {lastName}</h1>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.date}>Posted on: {created}</p>
        <h2 className={styles.h2}>Need Summary:</h2>
        <p className={styles.info}>{summary}</p>
        <h2 className={styles.h2}>Need Details:</h2>
        <p className={styles.info}>{details}</p>
      </div>
      {userId !== currentUser.id ?
        <Link to={`/messages/${userId}`} className={styles.a}>
          <button className={styles.button}>Contact</button>
        </Link>
        :
        <>
          <Link to={`/messages/${userId}/edit`} className={styles.a}>
            <button className={styles.button}>Edit</button>
          </Link>
          <button onClick={() => {setIsDeleteModal(true)}} type='submit' className={`${styles.button} ${styles.red}`}>Delete</button>
        </>
      }
      {isDeleteModal &&
        <div className={styles.deleteModal}>
          <p>Are you sure you want to delete this need?</p>
          <button onClick={() => {setIsDeleteModal(false)}}className={styles.button} >No</button>
          <button onClick={() => confirmDelete()}className={`${styles.button} ${styles.red}`} >Yes</button>
        </div>
      }
      </>
      :
      <RingLoader
        css={{margin: '20px auto'}}
        size={35}
        color='lightblue'
      />
    }
    </main>
    </>
  )
}

export default NeedDetail;