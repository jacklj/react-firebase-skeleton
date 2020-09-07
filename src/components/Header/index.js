import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { selectUid } from 'redux/auth/selectors';
import { selectName } from 'redux/user/selectors';
import HeaderButton from './HeaderButton';

const Container = styled.header`
  flex: 0 1 auto; // so it doesn't look too bad on safari

  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  background-color: rgba(31, 31, 31, 0.8);
  align-items: center;
  font-size: 1.7em;
  color: white;
  padding: 10px;

  // so content doesn't go under the notch on notched phones
  padding-left: max(env(safe-area-inset-left), 10px);
  padding-right: max(env(safe-area-inset-right), 10px);
`;

const TitleText = styled.div`
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: auto;

  padding-right: 10px; // minimum gap between title text and buttons or avatar
  margin-right: auto; // flex alg pushes following items to the right

  text-shadow: 2px 4px 4px #000000;
  color: white;
  text-align: left;

  @media (max-width: 400px) {
    font-size: 22px;
  }
`;

const Yellow = styled.span`
  color: #ffbf00;
`;

const UserName = styled.div`
  flex-grow: 0;
  flex-basis: auto;
  flex-shrink: 1;

  overflow: hidden;

  margin-left: 7px; // put left padding on UserName, rather than right padding on ProfileImage, in case
  // ProfileImage isn't rendered for some reason - then there will still be a margin between UserName
  // and the title text

  text-overflow: ellipsis;
  white-space: nowrap;

  font-size: 0.6em;

  @media (max-width: 470px) {
    // dont display username when narrow viewport
    display: none;
  }
`;

const Header = () => {
  const history = useHistory();
  const uid = useSelector(selectUid);
  const name = useSelector(selectName);

  const isLoggedIn = !!uid;

  const goToSettings = () => {
    history.push('/settings');
  };

  return (
    <>
      <Container>
        <TitleText>
          <Yellow>r</Yellow>eact <Yellow>f</Yellow>irebase <Yellow>s</Yellow>
          keleton
        </TitleText>

        {isLoggedIn ? (
          <HeaderButton onClick={goToSettings} Icon={undefined}>
            Settings
          </HeaderButton>
        ) : null}
        {name && <UserName>{name}</UserName>}
      </Container>
    </>
  );
};

export default Header;
