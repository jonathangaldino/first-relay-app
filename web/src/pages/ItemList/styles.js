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

  h1 { align-self: center; }

  a {
    color: #E5E9F0;
    align-self: center;
    margin-top: 15px;
  }
`;

export const List = styled.div`
  background: purple;
  
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 30px;
`;

export const Center = styled.div`
  margin-top: 100px;
  align-self: center;
  background: red;
  width: 60%;
`;