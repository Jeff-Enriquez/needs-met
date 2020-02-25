import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import Needs from './components/Needs';
import Messages from './components/Messages';
import AddANeed from './components/AddANeed';
import MyNeeds from './components/MyNeeds';
import More from './components/More';
import My404 from './components/My404';
import PrivateRoute from './components/PrivateRoute'



class App extends Component {
  state = {
    currentUser: {},
    currentPage: '/',
    isLoggedIn: true,
    isUnmet: false,
  }

  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true : false,
    })
  }

  toggleIsUnmet = () => {
    this.setState((state) => ({
     isUnmet: !state.isUnmet,
    }))
  }

  render() {
    return (
      <>
        <Switch>
          <Route exact path='/' render={() => <PrivateRoute
            component={Needs} 
            isUnmet={this.state.isUnmet} 
            toggleIsUnmet={this.toggleIsUnmet}
            isLoggedIn={this.state.isLoggedIn}
          />} />
          <Route exact path='/messages' render={() => <PrivateRoute
            component={Messages}
            isLoggedIn={this.state.isLoggedIn}
          />} />
          <Route exact path='/add-a-need' render={() => <PrivateRoute
            component={AddANeed}
            isLoggedIn={this.state.isLoggedIn}
          />} />
          <Route exact path='/my-needs' render={() => <PrivateRoute
            component={MyNeeds}
            isLoggedIn={this.state.isLoggedIn}
          />} />
          <Route exact path='/more' render={() => <PrivateRoute
            component={More}
            isLoggedIn={this.state.isLoggedIn}
          />} />
          <Route exact path='/login' component={Login} />
          <Route component={My404} />
        </Switch>
      </>
      
    );
  }
}

export default App;
