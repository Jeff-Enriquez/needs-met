import React, { Component } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom'
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
    isUnmet: false,
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
    if(!this.state.user.isLoggedIn){
      return <Login />
    } else {
      return (
        <>
          <Header />
          <Switch>
            <Route exact path='/' render={() => <Needs
              isUnmet={this.state.isUnmet} 
              toggleIsUnmet={this.toggleIsUnmet}
            />} />
            <Route exact path='/messages' component={Messages} />
            <Route exact path='/add-a-need' component={AddANeed} />
            <Route exact path='/my-needs' component={MyNeeds} />
            <Route exact path='/more' component={More} />
            <Route exact path='/login' component={Login} />
          </Switch>
          <Footer currentPage={this.currentPage} />
        </>
      );
    }
  }
}

export default App;
