import React, { useState, useEffect } from 'react';
import Firebase from './services/Firebase/firebase'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import './App.css';
import SignIn from './components/Signin';
import PrivateRoute from './components/PrivateRoute';
import Needs from './pages/Needs';
import NeedDetail from './pages/NeedDetail';
import Messages from './pages/Messages';
import AddANeed from './pages/AddANeed';
import MyNeeds from './pages/MyNeeds';
import More from './pages/More';
import My404 from './pages/My404';

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isUnmet, setIsUnmet] = useState(true)

  const doSetCurrentUser = user => {
    console.log(user)
    setCurrentUser(user)
    setIsLoggedIn(user ? true : false)
  }

  useEffect(() => {
    Firebase.auth.onAuthStateChanged(user => {
      if(user){
        Firebase.database.collection('Users').doc(user.uid)
        .get()
        .then((doc) => {
          if(doc.exists) {
            const user = doc.data()
            user['id'] = doc.id
            doSetCurrentUser(user)
            props.history.push('/needs')
          }
        })
      }
  })}, [])

  const toggleIsUnmet = () => {
    setIsUnmet(!isUnmet)
  }

  return (
    <Switch>
      <PrivateRoute 
        exact path='/needs/:id'
        component={NeedDetail}
        isLoggedIn={isLoggedIn}
      />
      <PrivateRoute
        exact path='/needs'
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
        currentUser={currentUser}
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
      <Route exact path='/' render={() =>
        <Redirect to='/needs' />
      } />
      <Route exact path='/signin' render={() => 
        <SignIn 
          doSetCurrentUser={doSetCurrentUser}
          currentUser={currentUser}
        />
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

export default withRouter(App);