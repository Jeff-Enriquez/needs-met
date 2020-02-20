import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/Login';
import Needs from './components/Needs';
import Messages from './components/Messages';
import AddANeed from './components/AddANeed';
import MyNeeds from './components/MyNeeds';
import More from './components/More';

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

  currentPage = (page) => {
    this.setState({
      currentPage: page,
     })
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
            <Footer currentPage={this.currentPage} />
          </>
        );
      } else if(state.currentPage === 'add a need') {
        return (
          <>
            <Header/>
            <AddANeed/>
            <Footer currentPage={this.currentPage} />
          </>
        )
      } else if(state.currentPage === 'my needs') {
        return (
          <>
            <Header/>
            <MyNeeds/>
            <Footer currentPage={this.currentPage} />
          </>
        )
      } else if(state.currentPage === 'more') {
        return (
          <>
            <Header/>
            <More/>
            <Footer currentPage={this.currentPage} />
          </>
        )
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
