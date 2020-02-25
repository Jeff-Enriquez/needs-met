import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';
const isLoggedIn = true
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    isLoggedIn
      ? 
      <>
        <Header />
        <Component {...props} />
        <Footer />
      </>
      : 
      <Redirect to='/login' />
  )} />
)

export default PrivateRoute