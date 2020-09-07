import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';

import { Button } from 'components/forms';
import PageContainer from 'components/PageContainer';
import H2 from 'components/H2';

function Settings() {
  const history = useHistory();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const goToDashboard = () => {
    history.push('/dashboard');
  };

  const logOut = async () => {
    setIsLoggingOut(true);
    try {
      await firebase.auth().signOut();
      // N.B. logOut action will be dispatched in auth listener
    } catch (error) {
      alert(error.message);
      setIsLoggingOut(false);
    }
  };

  return (
    <PageContainer>
      <H2>Settings</H2>
      <Button onClick={goToDashboard}>dashboard</Button>
      <Button onClick={logOut} loading={isLoggingOut}>
        Log out
      </Button>
    </PageContainer>
  );
}

export default Settings;
