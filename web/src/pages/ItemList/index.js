import React from 'react';
import { createFragmentContainer, QueryRenderer } from 'react-relay';
import graphql from 'babel-plugin-relay/macro';

import { Container, Content, List } from './styles';
import Environment from '../../relay/Environment';
// import createQueryRenderer from '../../relay/createQueryRendererModern';
import Item from '../../components/Item';


const ItemList = ({ items }) => {  
  
  return (
    <Container>
      <Content>
        <h1>Items</h1>

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

// const ItemListQR = createQueryRenderer(
//   ItemListFragmentContainer,
//   ItemList,
//   {
//     query: graphql`
//       query ItemListQuery {
//         items {
//           ...ItemList_items
//         }
//       }
//     `,
//   },
// );


const ItemListQueryRenderer = () => (
  <QueryRenderer
    environment={Environment}
    query={graphql`
      query ItemListQuery {
        items {
          ...ItemList_items
        }
      }
    `}
    render={({ error, props }) => {
      if (error) {
        return <span>{error.toString()}</span>;
      }

      if (props) {
        return <ItemListFragmentContainer {...props} query={props} />;
      }

      return <span>loading</span>;
    }}
  />
)


export default ItemListQueryRenderer;