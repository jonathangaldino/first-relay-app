import styled from 'styled-components';

export const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  /* padding: 100px 0px; */

  button {
    width: 100px;
    height: 40px;
    position: absolute;
    bottom: 0;
    margin-bottom: 20px;

    transition: background 0.5s;

    &:hover {
      background: #434C5E;
      color: #ECEFF4;
    }
  }
`;

export const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 32px;
  }

  
`;

export const Content = styled.div`
  margin-top: 45px;
  height: 125px;
  width: 300px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  padding: 20px 0px;  

  background: #4C566A;
  border-radius: 8px;
  outline: 0;

  small {
    color: #2E3440;
  }
`;