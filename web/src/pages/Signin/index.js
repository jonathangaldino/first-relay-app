import React, { useCallback, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';

import { Container } from './styles';
import Form from '../../components/Form';
import Mutation from '../../relay/mutation';
import { useHistory } from 'react-router-dom';

const mutation = graphql`
  mutation SigninMutation($data: UserLoginWithEmailInput!) {
      UserLoginWithEmail(input: $data) {
      token
      me {
        id
        _id
        email
      }
    }
  }
`;

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onCompleted = useCallback(({ UserLoginWithEmail: { token, me } }, errors) => {
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
      <h1>Signin</h1>

      <Form 
        submitCallback={submitCallback} 
        loading={loading} 
        setLoading={setLoading}
        linkTo={"/signup"}
        linkMessage={"I don't have an account yet"}
        btnMessage={"Signin"}
      />
    </Container>
  )
}

export default Signin;