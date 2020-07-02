import styled from 'styled-components';

export const Container = styled.section`
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1 {
      font-size: 24px;
    }
  `;

export const Form = styled.form`
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
    height: 35px;
    border: 0;
    border-radius: 50px;
    background: #4C566A;
    color: #D8DEE9;
    font-weight: 300;
  }

  a {
    align-self: center;
    margin-top: 10px;

    color: #4C566A;
  }
`;