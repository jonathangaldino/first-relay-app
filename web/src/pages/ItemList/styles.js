import styled from 'styled-components';

export const Container = styled.section`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Content = styled.div`
  height: 80%;
  width: 100%;

  display: flex;
  flex-direction: column;

  p {
    align-self: center;
    margin: 100px 0px;
    font-weight: 30px;
    color: red;
  }
`;


export const Actions = styled.div`
  align-self: center;

  display: flex;
  flex-direction: column;
  align-items: center;


  h1 {
    font-size: 28px;
  }

  a {
    color: #E5E9F0;
    margin-top: 15px;
  }

  button {
    background: #5E81AC;
    margin-top: 15px;
  }
`;

export const List = styled.div`
  width: 100%;
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  justify-items: center;
  row-gap: 30px;
`;

export const Center = styled.div`
  margin-top: 100px;
  align-self: center;
  width: 60%;
`;