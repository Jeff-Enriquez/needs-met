import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login';
import Needs from './components/Needs';

class App extends Component {
  state = {
    user: {
      isLoggedIn: true,
    },
    isUnmet: false,
  }

  toggleIsUnmet = () => {
    this.setState((state) => ({
     isUnmet: !state.isUnmet,
    }))
  }

  render() {
    if(this.state.user.isLoggedIn) {
      return (
        <>
          <Header/>
          <Needs isUnmet={this.state.isUnmet} toggleIsUnmet={() => this.toggleIsUnmet()}/>
          <Footer/>
        </>
      );
    } else {
      return (
        <>
          <Login/>
        </>
      )
    }
  }
}

export default App;
