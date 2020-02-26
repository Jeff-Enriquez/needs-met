import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';

const PrivateRoute = ({ component: Component, isLoggedIn, exact, path, ...rest }) => (
  isLoggedIn
    ?
    <Route exact path={path} render={(props) => (
    <>
      <Header />
      <Component {...rest} />
      <Footer pathname={props.location.pathname}/>
    </>
    )} />
    : 
    <Redirect to='/signin' />
)

export default PrivateRoute