import React from 'react';
import { Route, Redirect } from 'react-router-dom'
import Header from '../Header';
import Footer from '../Footer';

const PrivateRoute = ({ component: Component, currentUser, exact, path, ...rest }) => (
  currentUser
    ?
    <Route exact path={path} render={(props) => (
    <>
      <Header />
      <Component currentUser={currentUser} {...rest} />
      <Footer pathname={props.location.pathname}/>
    </>
    )} />
    : 
    <Redirect to='/signin' />
)

export default PrivateRoute