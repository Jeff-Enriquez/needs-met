import React, { Component } from 'react';
import'./Login.css';

class Login extends Component {
  state = {
    isLogin: true,
  }

  switchIsLogin = () => {
    this.setState(state => ({
      isLogin: !state.isLogin
    }))
  }

  render(){
    const { isLogin } = this.state

    return (
    <div className="form-structor">
      <div className={isLogin ? 'login' : 'login slide-up'}>
        <h2 className="form-title" id="login" onClick={isLogin ? () => {} : this.switchIsLogin }> 
          <span>or</span>Log in
        </h2>
        <div className="form-holder">
          <input type="email" className="input" placeholder="Email" />
          <input type="password" className="input" placeholder="Password" />
        </div>
        <button className="submit-btn">Log in</button>
      </div>
      <div className={isLogin ? 'signup slide-up' : 'signup'}>
        <div className="center">
          <h2 className="form-title" id="signup" onClick={isLogin ? this.switchIsLogin : () => {}}>
            <span>or</span>Sign up
          </h2>
          <div className="form-holder">
            <input type="text" className="input" placeholder="Name" />
            <input type="email" className="input" placeholder="Email" />
            <input type="password" className="input" placeholder="Password" />
          </div>
          <button className="submit-btn">Sign up</button>
        </div>
      </div>
    </div>
    );
  }
}

export default Login;
