import React, { useState } from 'react';
import styles from './AddANeed.module.css';

const AddANeed = () => {
  const [summary, setSummary] = useState('')
  const [details, setDetails] = useState('')

  return (
    <>
      <div className={styles.main}>
        <h1 className={styles.h1}>Add A Need</h1>
        <form className={styles.form}>
          <textarea 
            className={styles.textarea} 
            placeholder="Enter a brief description of your need..." 
            name="summary" value={summary} 
            onChange={e => setSummary(e.target.value)} 
            maxLength="100"
          />
          <textarea 
            className={styles.textarea} 
            placeholder="Enter a detailed description of your need..." 
            name="details" 
            value={details} 
            onChange={e => setDetails(e.target.value)} 
            maxLength="750"
          />
          <button type='submit' className={`${styles.submitBtn} ${styles.blue}`}>Add Need</button>
        </form>
      </div>
    </> 
  );
}

export default AddANeed;
