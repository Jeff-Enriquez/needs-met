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
import DirectMessage from './pages/DirectMessage'

const App = (props) => {
  const [currentUser, setCurrentUser] = useState(null)

  const doSetCurrentUser = user => {
    setCurrentUser(user)
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

  return (
    <Switch>
      <PrivateRoute 
        exact path='/needs/:id'
        component={NeedDetail}
        currentUser={currentUser}
      />
      <PrivateRoute
        exact path='/needs'
        component={Needs} 
        currentUser={currentUser}
      />
      <PrivateRoute
        exact path='/messages'
        component={Messages}
        currentUser={currentUser}
      />
      <PrivateRoute
        exact path='/messages/:id'
        component={DirectMessage}
        currentUser={currentUser}
      />
      <PrivateRoute
        exact path='/add-a-need'
        component={AddANeed}
        currentUser={currentUser}
      />
      <PrivateRoute
        exact path='/my-needs'
        component={MyNeeds}
        currentUser={currentUser}
      />
      <PrivateRoute
        exact path='/more'
        component={More}
        currentUser={currentUser}
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