import React, { useCallback, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';


import { Container } from './styles';
import Form from '../../components/Form';
import Mutation from '../../relay/mutation';
import { useHistory } from 'react-router-dom';

const mutation = graphql`
  mutation SignupMutation($data: UserRegisterWithEmailInput!) {
      UserRegisterWithEmail(input: $data) {
      token
      me {
        _id
        email
      }
    }
  }
`;

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  
  const onCompleted = useCallback(({ UserRegisterWithEmail: { token, me } }, errors) => {
    setLoading(false);
    
    if (errors) {
      console.log({ errors });
      return;
    }

    if (token) {
      localStorage.setItem("first-relay-app::token", token);
      history.push('/list');
    }
  }, [])

  const onError = useCallback((err) => {
    console.log(err);
    setLoading(false);
  }, [])

  const submitCallback = useCallback(({ email, password }) => {
    Mutation.commit(mutation, { email, password }, onCompleted, onError);
  }, [mutation, onCompleted, onError])
  
  return (
    <Container>
      <h1>Signup</h1>

      <Form 
        submitCallback={submitCallback} 
        loading={loading} 
        setLoading={setLoading}
        linkTo={"/"}
        linkMessage={"I already have an account"}
        btnMessage={"Signup"}
      />
    </Container>
  )
}

export default Signup;