import React, { Component } from 'react';
import styles from './Login.module.css';
import Firebase from '../Firebase/firebase';
import { Redirect } from 'react-router-dom';
import Login from '../Login';
import Signup from '../Signup';

class Signin extends Component {
  state = {
    isLogin: true,
    isAuth: false,
    signupError: null,
  }

  switchIsLogin = () => {
    this.setState(state => ({
      isLogin: !state.isLogin
    }))
  }

  doAuth = () => {
    this.setState({ isAuth: true });
  }

  render(){
    const { isLogin, isAuth, } = this.state
    if (isAuth) {
      return <Redirect to='/' />
    }

    return (
      <main className={styles.main}>
        <div className={styles.formStructor}>
          <div className={isLogin ? styles.login : `${styles.login} ${styles.slideUp}`}>
            <h2 className={styles.formTitle} onClick={isLogin ? () => {} : this.switchIsLogin }> 
              <span className={styles.span} >or</span>Log in
            </h2>
            <Login doSetCurrentUser={this.props.doSetCurrentUser} doAuth={this.doAuth}/>
          </div>
          <div className={isLogin ? `${styles.signup} ${styles.slideUp}` : styles.signup}>
            <div className={styles.center}>
              <h2 className={styles.formTitle} onClick={isLogin ? this.switchIsLogin : () => {}}>
                <span className={styles.span} >or</span>Sign up
              </h2>
              <Signup doSetCurrentUser={this.props.doSetCurrentUser} doAuth={this.doAuth}/>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Signin;
