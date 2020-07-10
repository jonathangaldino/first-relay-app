import React, { useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import graphql from 'babel-plugin-relay/macro';

import { Container, Form, Content } from './styles';
import Mutation from '../../relay/mutation';


const types = [
  "GUN",
  "ARMOR",
]

const mutation = graphql`
  mutation CreateItemMutation($data: CreateItemInput!) {
    CreateItem(input: $data) {
      item {
        _id
      }
    }
  }
`;

const Create = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [type, setType] = useState("GUN");

  const history = useHistory();

  const onError = useCallback((err) => {
    console.log(err);
  }, [])

  const onCompleted = useCallback(({ CreateItem: { item }}, errors) => {
    
    if (errors) {
      console.log({ errors });
    } else {
      console.log("onCompleted -> item", item)
      alert('Item created successfully');
      history.push('/list');
    }
  }, [])
  
  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const variables = {
      name, price: parseInt(price, 10), type
    }

    console.log({ variables })

    Mutation.commit(mutation, variables, onCompleted, onError);
  }, [name, price, type, mutation, onCompleted, onError])

  return (
    <Container>
      <Content>
        <h1>Create</h1>

        <Form onSubmit={handleSubmit}>
          <label>
            Name 
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Price 
            <input 
              type="number" 
              value={price}
              min="1"
              max="10000" 
              onChange={(e) => setPrice(e.target.value)}
            />
          </label>

          <label>
            Type 
            <select value={type} onChange={e => setType(e.target.value)}>
              {types.map(type => 
                (<option value={type} key={type}>
                  {type}
                </option>))}
            </select>
          </label>

          <button type="submit">Create!</button>

          <Link to="/list">Back</Link>
        </Form>
      </Content>
    </Container>
  )
}

export default Create;