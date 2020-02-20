import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login';
import Needs from './components/Needs';
import Messages from './components/Messages';

class App extends Component {
  state = {
    user: {
      isLoggedIn: true,
    },
    isUnmet: true,
    currentPage: 'help',
  }

  toggleIsUnmet = () => {
    this.setState((state) => ({
     isUnmet: !state.isUnmet,
    }))
  }

  currentPage = () => {
    console.log('hit')
  }

  render() {
    let state = this.state;
    if(state.user.isLoggedIn) {
      if(state.currentPage === 'help') {
        return (
          <>
            <Header/>
            <Needs 
              isUnmet={state.isUnmet} 
              toggleIsUnmet={this.toggleIsUnmet}
            />
            <Footer currentPage={this.currentPage} />
          </>
        );
      } else if(state.currentPage === 'messages') {
        return (
          <>
            <Header/>
            <Messages/>
            <Footer/>
          </>
        );
      }
      
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
