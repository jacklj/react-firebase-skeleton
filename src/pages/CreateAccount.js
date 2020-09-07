import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { Button, Input, Label, FieldContainer, Form } from 'components/forms';
import PageContainer from 'components/PageContainer';
import H2 from 'components/H2';

function CreateAccount() {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const createAccount = async (event) => {
    event.preventDefault();
    setIsCreatingAccount(true);
    try {
      // set auth persistence level:
      // LOCAL - persists across tabs
      // SESSION - persists within a tab (across page refreshes, but not shared between tabs)
      // NONE - doesnt persist at all.
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

      const userCredentials = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // N.B. not using built in auth/user.displayName because can't listen to changes,
      // and when onAuthStateChange fires, the name is not yet set.
      const { user } = userCredentials;
      const { uid } = user;
      await firebase.firestore().collection('users').doc(uid).set({
        name,
      });

      // N.B. "is logged in" listener in top level App component routes us to /dashboard,
      // so we don't need to do any routing here
    } catch (error) {
      console.error(error);
      const { message } = error;
      alert(message);
      setIsCreatingAccount(false);
    }
  };

  const goTologInPage = () => {
    history.push('/');
  };

  return (
    <PageContainer>
      <H2>Create account</H2>
      <Form onSubmit={(event) => createAccount(event)}>
        <FieldContainer>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </FieldContainer>
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

        <Button loading={isCreatingAccount}>Next</Button>
      </Form>
      <Button onClick={goTologInPage}>Log in</Button>
    </PageContainer>
  );
}

export default CreateAccount;
