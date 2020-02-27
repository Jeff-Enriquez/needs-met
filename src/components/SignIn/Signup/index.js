import React, { useState } from 'react';
import Firebase from '../../../services/Firebase/firebase';
import styles from '../Login.module.css';

const Signup = ({ doSetCurrentUser, doAuth }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(null)

  const isInvalid =
      password1 !== password2 ||
      password1 === '' ||
      email === '' ||
      firstName === '' ||
      lastName === ''

  const handleForm = async e => {
    e.preventDefault();
    if(isInvalid){ return } else {
    try {
      const { user } = await Firebase.doCreateUserWithEmailAndPassword(email, password1);
      await Firebase.database.collection('Users').add({
        firstName: firstName,
        lastName: lastName,
        email: email,
        authId: user.uid,
        messages: [],
        myNeeds: [],
      })
      doSetCurrentUser({
        email, firstName, lastName, uid: user.uid,
      });
      doAuth();
    } catch (err) {
      setError(err)
    }
  }};

  return (
    <>
      <form onSubmit={handleForm}>
        <div className={styles.formHolder}>
          <input type="text" className={styles.input} placeholder="First Name" name='firstName' value={firstName} onChange={e => setFirstName(e.target.value)}  />
          <input type="text" className={styles.input} placeholder="Last Name" name='lastName' value={lastName} onChange={e => setLastName(e.target.value)}  />
          <input type="email" className={styles.input} placeholder="Email" name='email' value={email} onChange={e => setEmail(e.target.value)}  />
          <input type="password" className={styles.input} placeholder="Password" name='password1' value={password1} onChange={e => setPassword1(e.target.value)}  />
          <input type="password" className={styles.input} placeholder="Confirm Password" name='password2' value={password2} onChange={e => setPassword2(e.target.value)}  />
        </div>  
      <button type='submit' disabled={isInvalid} className={styles.submitBtn}>Sign up</button>
      </form>
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </>
  )
}

export default Signup;