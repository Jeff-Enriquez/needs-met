import React, { useState } from 'react';
import Firebase from '../../../services/Firebase/firebase';
import styles from '../Login.module.css';

const Signup = ({ doSetCurrentUser }) => {
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
      const { user } = await Firebase.doCreateUserWithEmailAndPassword(email, password1)
      await Firebase.database.collection('Users').doc(user.uid).set({
        firstName: (firstName.slice(0,1).toUpperCase() + firstName.slice(1,firstName.length)),
        lastName: (lastName.slice(0,1).toUpperCase() + lastName.slice(1,lastName.length)),
        email: email,
        chats: [],
        needs: [],
      })
      const doc = await Firebase.database.collection('Users').doc(user.uid).get()
      const currentUser = doc.data()
      currentUser['id'] = doc.id
      await doSetCurrentUser(currentUser)
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
          <input type="email" className={styles.input} placeholder="Email" autoComplete='email' value={email} onChange={e => setEmail(e.target.value)}  />
          <input type="password" className={styles.input} placeholder="Password" autoComplete='new-password' value={password1} onChange={e => setPassword1(e.target.value)}  />
          <input type="password" className={styles.input} placeholder="Confirm Password" autoComplete='new-password' value={password2} onChange={e => setPassword2(e.target.value)}  />
        </div>  
      <button type='submit' disabled={isInvalid} className={styles.submitBtn}>Sign up</button>
      </form>
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </>
  )
}

export default Signup;