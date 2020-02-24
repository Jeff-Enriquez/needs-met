import React, { Component } from 'react';
import styles from './Login.module.css';

class Login extends Component {
  state = {
    loginEmail: '',
    loginPassword: '',
    signupName: '',
    signupEmail: '',
    signupPassword: '',
    isLogin: true,
  }

  switchIsLogin = () => {
    this.setState(state => ({
      isLogin: !state.isLogin
    }))
  }

  handleChange = e => {
    console.log(e.target)
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  render(){
    const { isLogin, loginEmail, loginPassword, signupName, signupEmail, signupPassword } = this.state

    return (
      <main className={styles.main}>
        <div className={styles.formStructor}>
          <div className={isLogin ? styles.login : `${styles.login} ${styles.slideUp}`}>
            <h2 className={styles.formTitle} onClick={isLogin ? () => {} : this.switchIsLogin }> 
              <span className={styles.span} >or</span>Log in
            </h2>
            <div className={styles.formHolder}>
              <input type="email" className={styles.input} placeholder="Email" name='loginEmail' value={loginEmail} onChange={this.handleChange} />
              <input type="password" className={styles.input} placeholder="Password" name='loginPassword' value={loginPassword} onChange={this.handleChange} />
            </div>
            <button className={styles.submitBtn}>Log in</button>
          </div>
          <div className={isLogin ? `${styles.signup} ${styles.slideUp}` : styles.signup}>
            <div className={styles.center}>
              <h2 className={styles.formTitle} onClick={isLogin ? this.switchIsLogin : () => {}}>
                <span className={styles.span} >or</span>Sign up
              </h2>
              <div className={styles.formHolder}>
                <input type="text" className={styles.input} placeholder="Name" name='signupName' value={signupName} onChange={this.handleChange} />
                <input type="email" className={styles.input} placeholder="Email" name='signupEmail' value={signupEmail} onChange={this.handleChange} />
                <input type="password" className={styles.input} placeholder="Password" name='signupPassword' value={signupPassword} onChange={this.handleChange} />
              </div>
              <button className={styles.submitBtn}>Sign up</button>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default Login;
