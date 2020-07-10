import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';

import { Container, Header } from './styles';

const Item = ({ item }) => {
  
  return (
    <Container>
      <Header>
        <strong>{item.name}</strong>
        <small>$ {item.price}</small>
      </Header>

      <Link to={`/item/${item.id}`}>
        More info
      </Link>
    </Container>
  )
}

const ItemFragmentContainer = createFragmentContainer(Item, {
  item: graphql`
    fragment Item_item on Item {
      id
      _id
      name
      price
      type
    }
  `
})

export default ItemFragmentContainer;