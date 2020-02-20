import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
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

  addNavBars = (Component) => {
    return (
      <>
        <Header/>
        <Component/>
        <Footer currentPage={this.currentPage} />
      </>
    )
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
          return this.addNavBars(Messages)
      } else if(state.currentPage === 'add a need') {
          return this.addNavBars(AddANeed)
      } else if(state.currentPage === 'my needs') {
          return this.addNavBars(MyNeeds)
      } else if(state.currentPage === 'more') {
          return this.addNavBars(More)
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
