import React, { useState } from 'react';
import Firebase from '../../../services/Firebase/firebase';
import styles from '../Login.module.css';

const Login = ({ doSetCurrentUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleForm = async e => {
    e.preventDefault()
    try {
      const { user } = await Firebase.doSignInWithEmailAndPassword(email, password);
      await Firebase.database.collection('Users').doc(user.uid)
      .get()
      .then(function(doc) {
        if(doc.exists) {
          const currentUser = doc.data()
          currentUser['id'] = doc.id
          doSetCurrentUser(currentUser)
        }
      })
      .catch(function(error) {
          setError('Sorry, there is an error with your account')
      });
    } catch (err) {
      setError(err)
    }
  }

  return(
    <>
      <form onSubmit={handleForm}>
        <div className={styles.formHolder}>
          <input type="email" className={styles.input} placeholder="Email" autoComplete='email' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className={styles.input} placeholder="Password" autoComplete='current-password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='submit' className={styles.submitBtn}>Log in</button>
      </form>
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </>
  )
}

export default Login;