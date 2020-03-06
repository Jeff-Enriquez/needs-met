import React, { useState } from 'react';
import Firebase from '../../services/Firebase/firebase';
import styles from './More.module.css';

function More({ currentUser, signOut }) {
  const [photoURL, setPhotoURL] = useState('')
  const [response, setResponse] = useState('')
  const [error, setError] = useState ('')

  const addPhoto = async e => {
    e.preventDefault()
    try {
      await Firebase.updateUserPhoto(currentUser.id, photoURL)
    } catch(error) {
      setError('Sorry, there was an error adding your photo')
      setTimeout(() => {setError('')}, 3000)
    }
    setResponse('Your photo has been added')
    setTimeout(() => {setResponse('')}, 3000)
  }

  

  return (
    <main className={styles.main}>
      <img className={styles.img} src={currentUser.photoURL ? currentUser.photoURL : process.env.PUBLIC_URL + '/images/blank-profile.png'} alt='profile'/>
      <h1 className={styles.h1}>Update Your Profile Picture</h1>
      <form className={styles.form} 
        onSubmit={e => {addPhoto(e); setPhotoURL('')}}
      >
        <input className={styles.input} type="url" placeholder="Enter Your Photo URL" value={photoURL} onChange={e => setPhotoURL(e.target.value)}  />
        <button className={styles.button} type='submit'>Submit</button>
      </form>
      {response && <p style={{ color: '#65bb48' }}>{response}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <h1 className={styles.h1}>LogOut</h1>
      <button className={styles.button} onClick={signOut}>Log out</button>
    </main> 
  );
}

export default More;
