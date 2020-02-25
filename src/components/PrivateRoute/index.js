import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
const PrivateRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn
      ? 
      <>
        <Header />
        <Component {...props} />
        <Footer pathname={props.location.pathname}/>
      </>
      : 
      <Redirect to='/login' />
  )} />
)

export default PrivateRoute