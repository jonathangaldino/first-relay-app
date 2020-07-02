import React, { useCallback, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';

import { Container } from './styles';
import Form from '../../components/Form';
import Mutation from '../../relay/mutation';

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
  
  const onCompleted = useCallback(({ UserLoginWithEmail: { token, me } }, errors) => {
    console.log({ token, me, errors})
    setLoading(false);
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
      />
    </Container>
  )
}

export default Signin;