import React, { useState, useEffect } from 'react';
import styles from './Login.module.css';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Signin = ({ currentUser, doSetCurrentUser, }) => {
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {}, [currentUser])

  return (
    <>
    {currentUser && <Redirect to='/' />}
    {currentUser === null &&
      <div className={styles.cover}>
      </div>
    }
    <main className={styles.main}>
      <div className={styles.formStructor}>
        <div className={isLogin ? styles.login : `${styles.login} ${styles.slideUp}`}>
          <h2 className={styles.formTitle} onClick={isLogin ? () => {} : () => setIsLogin(!isLogin) }> 
            <span className={styles.span} >or</span>Log in
          </h2>
          <Login doSetCurrentUser={doSetCurrentUser} />
        </div>
        <div className={isLogin ? `${styles.signup} ${styles.slideUp}` : styles.signup}>
          <div className={styles.center}>
            <h2 className={styles.formTitle} onClick={isLogin ? () => setIsLogin(!isLogin) : () => {}}>
              <span className={styles.span} >or</span>Sign up
            </h2>
            <Signup doSetCurrentUser={doSetCurrentUser} />
          </div>
        </div>
      </div>
    </main>
    </>
  );
}

export default Signin;
