import React, { useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import SignIn from './components/Signin';
import PrivateRoute from './components/PrivateRoute';
import Needs from './pages/Needs';
import Messages from './pages/Messages';
import AddANeed from './pages/AddANeed';
import MyNeeds from './pages/MyNeeds';
import More from './pages/More';
import My404 from './pages/My404';

const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isUnmet, setIsUnmet] = useState(true)

  const doSetCurrentUser = user => {
    setCurrentUser(user)
    setIsLoggedIn(user ? true : false)
  }

  const toggleIsUnmet = () => {
    setIsUnmet(!isUnmet)
  }

  return (
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
      <Route exact path='/signin' render={() => 
        <SignIn doSetCurrentUser={doSetCurrentUser}/>
      } />
      <Route exact path='/login' render={() =>
        <Redirect to='/signin' />
      } />
      <Route exact path='/signup' render={() =>
        <Redirect to='/signin' />
      } />
      <Route component={My404} />
    </Switch>
  )
}

export default App;
