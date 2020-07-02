import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';

import { Container, Form } from './styles';
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

const Signin = (props) => {
  const [email, setEmail] = useState("jonathan@galdino.dev");
  const [password, setPassword] = useState("jonathan");
  const [loading, setLoading] = useState(false);
  
  console.log({ props }) ;

  const onCompleted = useCallback(({ UserLoginWithEmail: { token, me } }, errors) => {
    console.log({ token, me, errors})
    setLoading(false);

    // history.push('/home');
  }, [])

  const onError = useCallback((err) => {
    console.log(err);
    setLoading(false);
  }, [])

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    setLoading(true);
    Mutation.commit(mutation, { email, password }, onCompleted, onError);
  }, [email, password, mutation, onCompleted, onError])
  
  return (
    <Container>
      <h1>Azzy's Store</h1>

      <Form onSubmit={handleSubmit}>
        <label>E-mail
          <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
        </label>
        
        <label>Password
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
        </label>

        { loading ? <button type="submit" disabled>Almost there...</button> : <button type="submit">Signin</button> }
        <Link to="/signup">I don't have an account yet</Link>
      </Form>
    </Container>
  )
}

export default Signin;