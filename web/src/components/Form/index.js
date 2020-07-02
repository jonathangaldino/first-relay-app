import React, { useState, useCallback } from 'react';

import { Container } from './styles';
import { Link } from 'react-router-dom';


const Form = ({ submitCallback, setLoading, loading, linkTo, linkMessage }) => {
  const [email, setEmail] = useState("jonathan@galdino.dev");
  const [password, setPassword] = useState("jonathan");

  const handleSubmit = useCallback((event) => {
    event.preventDefault();

    setLoading(true);
    submitCallback({ email, password });
  }, [email, password])

  return (
    <Container onSubmit={handleSubmit}>
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

      { loading ? <button type="submit" disabled>Loading...</button> : <button type="submit">Signin</button> }
  <Link to={linkTo}>{linkMessage}</Link>
    </Container>
  )
}

export default Form;