import React, { useEffect, useState } from 'react';
import Firebase from '../../services/Firebase/firebase';
import { Link, Redirect } from 'react-router-dom';
import styles from './EditNeed.module.css';
import RingLoader from "react-spinners/RingLoader";

const EditNeed = (props) => {
  const needId = props.computedMatch.params.id
  const [summary, setSummary] = useState('')
  const [details, setDetails] = useState('')
  const [created, setCreated] = useState('')
  const [error, setError] = useState('')
  const [redirect, setRedirect] = useState(false)

  const sumLen = 100;
  const detLen = 750;

  useEffect(() => {
    const asyncFunction = async () => {
      const { summary, details, created } = await Firebase.getANeed(needId)
      setSummary(summary)
      setDetails(details)
      setCreated(created.toDate().toString().slice(0,21))
    }
    asyncFunction()
  }, [])

  const handleForm = async e => {
    e.preventDefault()
    if(summary.length > sumLen) {
      setError(`The summary must be less than ${sumLen} characters`)
    } else if (details.length > detLen) {
      setError(`The detail must be less than ${detLen} characters`)
    } else if (details.length === 0) {
      setError('You must enter a detail description')
    } else if (summary.length === 0) {
      setError('You must enter a summary')
    } else {
      try {
        await Firebase.updateNeed(needId, summary, details)
        setRedirect(true)
      } catch(error) {
      }
    }
  }

  return (
    <>
    {redirect && <Redirect to={`/needs/${needId}`} />}
    {created ?
      <main className={styles.main}>
        <h1 className={styles.h1}>Edit My Need</h1>
        <p className={styles.date}>Posted on: {created}</p>
        <h2 className={styles.h2}>Need Summary:</h2>
        <form onSubmit={e => handleForm(e)} className={styles.infoContainer}>
          <textarea 
            className={styles.textarea}
            value={summary} 
            onChange={e => setSummary(e.target.value)} 
            maxLength={sumLen}
          />
          <h2 className={styles.h2}>Need Details:</h2>
          <textarea 
            className={styles.textarea} 
            value={details} 
            onChange={e => setDetails(e.target.value)} 
            maxLength={detLen}
            />
          {error && <span style={{ color: 'red' }}>{error}</span>}
          <button className={styles.button} type='submit'>Confirm</button>
          <Link to={`/needs/${needId}`} className={styles.a}>
            <button onClick={() => setRedirect(true)}className={styles.button}>Cancel</button>
          </Link>
        </form>
      </main>
    :
      <RingLoader
        css={{margin: '20px auto'}}
        size={35}
        color='lightblue'
      />
    }
    </>
  )
}

export default EditNeed;