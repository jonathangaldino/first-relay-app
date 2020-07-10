import styled from 'styled-components';

export const Container = styled.form`
  margin-top: 150px;
  
  display: flex;
  flex-direction: column;

  label, input {
    display: block;
  }

  label {
    margin-bottom: 25px;
  }

  input {
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
    background: #4C566A;
    color: #D8DEE9;
    font-weight: 300;

    &:hover {
      background: #434C5E;
    }
  }

  a {
    align-self: center;
    margin-top: 10px;

    color: #4C566A;
    transition: color 0.3s;

    &:hover {
      color: #D8DEE9;
    }
  }
`;