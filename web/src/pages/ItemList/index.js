import React, { useCallback, useState } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Link } from 'react-router-dom';
import { createRefetchContainer } from 'react-relay';
import InfiniteScroll from 'react-infinite-scroller';

import { Container, Content, List, Center } from './styles';
import Item from '../../components/Item';
import createQueryRenderer from '../../relay/createQueryRendererModern';

const ItemList = (props) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const { data: { items }, relay } = props;

  const loadMore = () => {
    if (isFetchingMore) return;

    const itemsAlreadyFetchedLength = items.edges.length;

    const refetchVariables = fragmentVariables => ({
      first: itemsAlreadyFetchedLength + 10,
    })

    setIsFetchingMore(true);
    relay.refetch(
      refetchVariables, 
      null, 
      () => { setIsFetchingMore(false) }
    );
  }

  return (
    <Container>
      <Content>
        <h1>Items</h1>
        <Link to="/create">Create a item</Link>

        <Center>
          <InfiniteScroll
              pageStart={0}
              loadMore={loadMore}
              hasMore={items.pageInfo.hasNextPage}
              loader={<p key={0}>Loading</p>}
              threshold={15}
            >
            
            <List>
            { items.edges.map(item => <Item key={item.node.__id} item={item.node} />) }
            </List>
          </InfiniteScroll>
        </Center>

        
        { !items.pageInfo.hasNextPage && <p>There's no more to get</p>}
      </Content>
    </Container>
  )
}

const ItemListRefetchContainer = createRefetchContainer(
  ItemList,
  {
    data: graphql`
      fragment ItemList_data on Query
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
      ) {
        items(first: $first) {
          edges {
            node {
              id
              ...Item_item
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `
  },
  graphql`
    # Refetch query to be fetched upon calling refetch
    query ItemListRefetchQuery($first: Int) {
      ...ItemList_data @arguments(first: $first)
    }
  `,
)

const ItemListQR = createQueryRenderer(
  ItemListRefetchContainer,
  ItemList,
  { 
    query: graphql`
      query ItemListQuery($first: Int) {
        ...ItemList_data @arguments(first: $first)
      }
    `,
    variables: {
      first: 10
    },
    getFragmentProps: (props) => ({ data: props })
  },
);

export default ItemListQR;