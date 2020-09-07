import React from 'react';

import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: inline-block;
  transform: translateZ(1px);
`;

const spinning = keyframes`
0%, 100% {
  animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
}
0% {
  transform: rotateY(0deg);
}
50% {
  transform: rotateY(1800deg);
  animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
}
100% {
  transform: rotateY(3600deg);
}
`;

const Spinner = styled.div`
  display: inline-block;
  width: 22px;
  height: 22px;

  border-radius: 50%;
  background: #ffcf40;
  animation: ${spinning} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`;

const LoadingSpinner = () => (
  <Container>
    <Spinner />
  </Container>
);

export default LoadingSpinner;
