import React, { useEffect } from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import * as firebase from 'firebase/app';
import 'firebase/database';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { selectUid } from 'redux/auth/selectors';
import { userUpdated } from 'redux/user/slice';
import { loggedIn, loggedOut } from 'redux/auth/slice';
import Header from 'components/Header';
import LogIn from 'pages/LogIn';
import CreateAccount from 'pages/CreateAccount';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';

const TopLevelContainer = styled.div`
  min-height: 100vh;

  display: flex;
  flex-direction: column;

  background-color: #fffef2;
`;

function App() {
  const dispatch = useDispatch();
  const uid = useSelector(selectUid);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        const { displayName: name, email, uid } = user;
        dispatch(loggedIn({ uid, name, email }));
      } else {
        // User is signed out.
        dispatch(loggedOut());
      }
    });

    return () => unsubscribe && unsubscribe();
  }, [dispatch]);

  useEffect(() => {
    let unsubscribe;
    const isLoggedIn = !!uid;
    if (isLoggedIn) {
      //  subscribe to user record
      unsubscribe = firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .onSnapshot((doc) => {
          const user = doc.data();
          console.log('User record updated: ', user);
          dispatch(userUpdated(user));
        });
    }

    return () => unsubscribe && unsubscribe();
  }, [dispatch, uid]);

  const isLoggedIn = !!uid;
  // N.B. <Redirect> components auto nav to the specified route (it's "declarative routing").
  return (
    <Router>
      {isLoggedIn ? <Redirect to="/dashboard" /> : <Redirect to="/" />}
      <TopLevelContainer>
        <Header />

        {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" exact>
            <LogIn />
          </Route>
          <Route path="/createAccount">
            <CreateAccount />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
        </Switch>
      </TopLevelContainer>
    </Router>
  );
}

export default App;
