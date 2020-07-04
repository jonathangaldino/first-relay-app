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

`;

export const Form = styled.form`
  margin-top: 150px;
  align-self: center;
  
  display: flex;
  flex-direction: column;

  label, input, select {
    display: block;
  }

  label {
    margin-bottom: 25px;
  }

  input, select {
    height: 30px;
    border: 0;
    border-radius: 6px;
    width: 250px;
    outline: 0;
    margin-top: 5px;
    background: #4C566A;
    color: #D8DEE9;
    padding-left: 10px;
  }

  button {
    height: 35px;
    border: 0;
    border-radius: 50px;
    background: #4C566A;
    color: #D8DEE9;
    font-weight: 300;

    transition: background 0.3s;

    &:hover {
      background: #434C5E;
    }
  }

  a {
    color: #E5E9F0;
    align-self: center;
    margin-top: 15px;
  }
`;