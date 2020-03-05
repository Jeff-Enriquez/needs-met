import React, { useState } from 'react';
import Firebase from '../../services/Firebase/firebase';
import { Redirect } from 'react-router-dom';
import styles from './AddANeed.module.css';

const AddANeed = ({ currentUser }) => {
  const [summary, setSummary] = useState('')
  const [details, setDetails] = useState('')
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(null)

  const sumLen = 100;
  const detLen = 750;

  const handleForm = async e => {
    e.preventDefault()
    if(summary.length > sumLen) {
      setError(`The brief description must be less than ${sumLen} characters`)
    } else if (details.length > detLen) {
      setError(`The detail description must be less than ${detLen} characters`)
    } else if (details.length === 0) {
      setError('You must enter a detail description')
    } else if (summary.length === 0) {
      setError('You must enter a brief description')
    } else {
      try {
        const id = await Firebase.addANeed(currentUser.id, summary, details)
        setRedirect(`/needs/${id}`)
      } catch(error) {
      }
    }
  }

  return (
    <>
      {redirect ? 
        <Redirect to={redirect} />
        :
        <div className={styles.main}>
          <h1 className={styles.h1}>Add A Need</h1>
          <form className={styles.form} onSubmit={handleForm}>
            <textarea 
              className={styles.textarea} 
              placeholder="Enter a brief description of your need..." 
              name="summary" value={summary} 
              onChange={e => setSummary(e.target.value)} 
              maxLength={sumLen}
            />
            <textarea 
              className={styles.textarea} 
              placeholder="Enter a detailed description of your need..." 
              name="details" 
              value={details} 
              onChange={e => setDetails(e.target.value)} 
              maxLength={detLen}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <button type='submit' className={`${styles.submitBtn} ${styles.blue}`}>Add Need</button>
          </form>
        </div>
      }
    </> 
  );
}

export default AddANeed;
