import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { Button, Input, Label, FieldContainer, Form } from 'components/forms';
import PageContainer from 'components/PageContainer';
import H2 from 'components/H2';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const goToCreateAccount = () => {
    history.push('/createAccount');
  };

  const logIn = async (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    try {
      // set auth persistence level:
      // LOCAL - persists across tabs
      // SESSION - persists within a tab (across page refreshes, but not shared between tabs)
      // NONE - doesnt persist at all.
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

      await firebase.auth().signInWithEmailAndPassword(email, password);

      // N.B. "is logged in" listener in top level App component routes us to /dashboard,
      // so we don't need to do any routing here
    } catch (error) {
      console.error(error);
      const { message } = error;
      alert(message);
      setIsLoggingIn(false);
    }
  };

  return (
    <PageContainer>
      <H2>log in</H2>
      <Form onSubmit={(event) => logIn(event)}>
        <FieldContainer>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </FieldContainer>
        <FieldContainer>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </FieldContainer>

        <Button loading={isLoggingIn}>Next</Button>
      </Form>

      <Button onClick={goToCreateAccount}>create account</Button>
    </PageContainer>
  );
}

export default Login;
