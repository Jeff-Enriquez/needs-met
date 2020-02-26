import React, { Component } from 'react';
import styles from './Login.module.css';
import Firebase from '../Firebase/firebase';
import { Redirect } from 'react-router-dom';
import Login from '../Login';

class Signin extends Component {
  state = {
    signupName: '',
    signupEmail: '',
    signupPassword1: '',
    signupPassword2: '',
    isLogin: true,
    isAuth: false,
    signupError: null,
  }

  switchIsLogin = () => {
    this.setState(state => ({
      isLogin: !state.isLogin
    }))
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  handleSignupForm = async e => {
    const { signupName, signupEmail, signupPassword1, } = this.state;
    e.preventDefault();
    try {
      await Firebase.doCreateUserWithEmailAndPassword(
        signupEmail,
        signupPassword1,
      );
      this.props.doSetCurrentUser({
        name: signupName,
        email: signupEmail,
      });
      this.setState({ isAuth: true });
    } catch (signupError) {
      this.setState({
        signupError,
      });
    }
  };

  doAuth = () => {
    this.setState({ isAuth: true });
  }

  render(){
    console.log(this.props)
    const { isLogin, signupName, signupEmail, signupPassword1, signupPassword2, isAuth, signupError, } = this.state
    if (isAuth) {
      return <Redirect to='/' />
    }
    const isInvalid =
      signupPassword1 !== signupPassword2 ||
      signupPassword1 === '' ||
      signupEmail === '' ||
      signupName === ''

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
              <form onSubmit={this.handleSignupForm}>
                <div className={styles.formHolder}>
                  <input type="text" className={styles.input} placeholder="Name" name='signupName' value={signupName} onChange={this.handleChange}  />
                  <input type="email" className={styles.input} placeholder="Email" name='signupEmail' value={signupEmail} onChange={this.handleChange}  />
                  <input type="password" className={styles.input} placeholder="Password" name='signupPassword1' value={signupPassword1} onChange={this.handleChange}  />
                  <input type="password" className={styles.input} placeholder="Confirm Password" name='signupPassword2' value={signupPassword2} onChange={this.handleChange}  />
                </div>  
                <button type='submit' disabled={isInvalid} className={styles.submitBtn}>Sign up</button>
              </form>
              {signupError && <span style={{ color: 'red' }}>{signupError.message}</span>}
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Signin;