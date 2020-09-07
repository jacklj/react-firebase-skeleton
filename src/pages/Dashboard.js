import React from 'react';
import { useHistory } from 'react-router-dom';

import { Button } from 'components/forms';
import PageContainer from 'components/PageContainer';
import H2 from 'components/H2';

function Dashboard() {
  const history = useHistory();

  const goToSettings = () => {
    history.push('/settings');
  };

  return (
    <PageContainer>
      <H2>dashboard</H2>
      <Button onClick={goToSettings}>settings</Button>
    </PageContainer>
  );
}

export default Dashboard;
