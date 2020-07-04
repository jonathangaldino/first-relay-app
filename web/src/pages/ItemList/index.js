import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';

import { Container, Content, List } from './styles';
import Item from '../../components/Item';
import createQueryRenderer from '../../relay/createQueryRendererModern';

const ItemList = ({ items }) => {
  return (
    <Container>
      <Content>
        <h1>Items</h1>
        <Link to="/create">Create a item</Link>

        <List>
          { items.edges.map(item => <Item key={item.node.__id} item={item.node} />) }
        </List>
      </Content>
    </Container>
  )
}

const ItemListFragmentContainer = createFragmentContainer(ItemList, {
  items: graphql`
    fragment ItemList_items on ItemConnection {
      edges {
        node {
          ...Item_item
        }
      }
    }
  `
})

const ItemListQR = createQueryRenderer(
  ItemListFragmentContainer,
  ItemList,
  {
    query: graphql`
      query ItemListQuery {
        items {
          ...ItemList_items
        }
      }
    `,
    getFragmentProps: ({ items }) => ({
      items,
    })
  },
);


export default ItemListQR;