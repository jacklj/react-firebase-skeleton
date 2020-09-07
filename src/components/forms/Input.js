import styled from 'styled-components';

const Input = styled.input`
  min-width: 50px;

  border: 0;
  border-radius: 0;
  outline: 0;
  background: transparent;
  border-bottom: 3px solid #333;
  color: #333;
  font-size: 1.2em;
  font-weight: 500;

  &::placeholder {
    font-size: 1.1em;
    color: #bbb;
  }

  &::selection {
    background: red;
  }
`;

export default Input;
