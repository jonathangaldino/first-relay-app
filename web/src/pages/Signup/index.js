import React, { useCallback, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';

import { Container } from './styles';
import Form from '../../components/Form';
import Mutation from '../../relay/mutation';

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
  
  const onCompleted = useCallback(({ UserRegisterWithEmail: { token, me } }, errors) => {
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
      <h1>Signup</h1>

      <Form 
        submitCallback={submitCallback} 
        loading={loading} 
        setLoading={setLoading}
        linkTo={"/"}
        linkMessage={"I already have an account"}
      />
    </Container>
  )
}

export default Signup;