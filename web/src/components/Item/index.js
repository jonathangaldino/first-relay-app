import React from 'react';
import { Container } from './styles';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

const Item = ({ item }) => {
  return (
    <Container>
      <strong>{item.name}</strong>
      <small>Credits: {item.price}</small>
    </Container>
  )
}

const ItemFragmentContainer = createFragmentContainer(Item, {
  item: graphql`
    fragment Item_item on Item {
      _id
      id
      name
      price
      type
    }
  `
})

export default ItemFragmentContainer;