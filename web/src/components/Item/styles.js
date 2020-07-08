import styled from 'styled-components';

export const Container = styled.div`
  background: #4C566A;
  width: 150px;
  height: 180px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-bottom: 10px;
  border-radius: 8px;
  outline: 0;

  a {
    margin-top: 10px;
    color: #E5E9F0;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  strong {
    font-size: 24px;
  }

  small {
    margin-top: 8px;
  }
`;
