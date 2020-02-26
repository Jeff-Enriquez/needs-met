import React, { useState } from 'react';
import Firebase from '../Firebase/firebase';
import styles from '../SignIn/Login.module.css';

const Signup = ({ doSetCurrentUser, doAuth }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password1, setPassword1] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState(null)

  const isInvalid =
      password1 !== password2 ||
      password1 === '' ||
      email === '' ||
      name === ''

  const handleForm = async e => {
    e.preventDefault();
    if(isInvalid){ return } else {
    try {
      await Firebase.doCreateUserWithEmailAndPassword(email, password1);
      doSetCurrentUser({
        name, email,
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
          <input type="text" className={styles.input} placeholder="Name" name='name' value={name} onChange={e => setName(e.target.value)}  />
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