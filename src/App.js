import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom'
import './App.css';
import Login from './components/Login';
import Needs from './components/Needs';
import Messages from './components/Messages';
import AddANeed from './components/AddANeed';
import MyNeeds from './components/MyNeeds';
import More from './components/More';
import My404 from './components/My404';
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [isUnmet, setIsUnmet] = useState(true)

  const doSetCurrentUser = user => {
    setCurrentUser(user)
    setIsLoggedIn(user ? true : false)
  }

  const toggleIsUnmet = () => {
    setIsUnmet(!isUnmet)
  }
 
  return (
    <>
      <Switch>
        <PrivateRoute
          exact path='/'
          component={Needs} 
          isUnmet={isUnmet} 
          toggleIsUnmet={toggleIsUnmet}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact path='/messages'
          component={Messages}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact path='/add-a-need'
          component={AddANeed}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact path='/my-needs'
          component={MyNeeds}
          isLoggedIn={isLoggedIn}
        />
        <PrivateRoute
          exact path='/more'
          component={More}
          isLoggedIn={isLoggedIn}
        />
        <Route exact path='/login' component={Login} />
        <Route component={My404} />
      </Switch>
    </>
  )
}

export default App;
