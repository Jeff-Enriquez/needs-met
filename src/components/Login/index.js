import React, { useState } from 'react';
import Firebase from '../Firebase/firebase';
import styles from '../SignIn/Login.module.css';

const Login = ({ doSetCurrentUser, doAuth }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleForm = async e => {
    e.preventDefault()
    try {
      await Firebase.doSignInWithEmailAndPassword(email, password);
      doSetCurrentUser({
        email,
      });
      doAuth();
    } catch (err) {
      setError(err)
    }
  }

  return(
    <>
      <form onSubmit={handleForm}>
        <div className={styles.formHolder}>
          <input type="email" className={styles.input} placeholder="Email" name='loginEmail' value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" className={styles.input} placeholder="Password" name='loginPassword' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='submit' className={styles.submitBtn}>Log in</button>
      </form>
      {error && <span style={{ color: 'red' }}>{error.message}</span>}
    </>
  )
}

export default Login;