import React from 'react';
import { createFragmentContainer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Container, Content, List } from './styles';
import createQueryRenderer from '../../relay/createQueryRendererModern';


const ItemList = (props) => {  
  return (
    <Container>
      <Content>
        <h1>Items</h1>

        <List>
          {/* {items.map(item => <Item key={item.id} item={item} />)} */}
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
    getFragmentProps: (({ items }) => ({
      items,
    })),
  },
);


export default ItemListQR;