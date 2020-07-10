import React, { useState, useCallback } from 'react';
import graphql from 'babel-plugin-relay/macro';
import { Link, useHistory } from 'react-router-dom';
import { createRefetchContainer } from 'react-relay';
import InfiniteScroll from 'react-infinite-scroller';

import { Container, Content, List, Center, Actions, Search } from './styles';
import Item from '../../components/Item';
import createQueryRenderer from '../../relay/createQueryRendererModern';

const ItemList = ({ data, relay }) => {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const history = useHistory();

  const { items } = data;

  const handleSearch = () => {
    loadMore(searchTerm)
  }

  const loadMore = () => {
    if (isFetchingMore) return;

    console.log("ItemList -> searchTerm", searchTerm)

    const itemsAlreadyFetchedLength = items.edges.length;

    const refetchVariables = () => ({
      first: itemsAlreadyFetchedLength + 10,
      name: searchTerm || ""
    })

    setIsFetchingMore(true);
    relay.refetch(
      refetchVariables, 
      null, 
      () => { setIsFetchingMore(false) }
    );
  }

  const handleLogout = useCallback(() => {
    localStorage.removeItem("first-relay-app::token");
    history.push('/');
  }, [])

  return (
    <Container>
      <Content>
        <Actions>
          <h1>Items</h1>
          <Link to="/create">Create a item</Link>
          <button type="button" onClick={handleLogout}>Logout</button>
        </Actions>

        <Center>
          <Search>
            <input type="text"
              value={searchTerm} 
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="button" onClick={() => handleSearch()}
            >Search</button>
          </Search>


          <InfiniteScroll
            pageStart={0}
            loadMore={loadMore}
            hasMore={items.pageInfo.hasNextPage}
            threshold={15}
          >
            
            <List>
              { 
                items.edges.map(item => 
                  <Item key={item.node.__id} item={item.node} />
                ) 
              }
            </List>
          </InfiniteScroll>
        </Center>

        
        { 
          !items.pageInfo.hasNextPage && 
          !isFetchingMore && 
          <p>End of search</p>
        }
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
        name: { type: "String", defaultValue: ""}
      ) {
        items(first: $first, name: $name) {
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
    query ItemListRefetchQuery($first: Int, $name: String) {
      ...ItemList_data @arguments(first: $first, name: $name)
    }
  `,
)

const ItemListQR = createQueryRenderer(
  ItemListRefetchContainer,
  ItemList,
  { 
    query: graphql`
      query ItemListQuery($first: Int, $name: String) {
        ...ItemList_data @arguments(first: $first, name: $name)
      }
    `,
    variables: {
      first: 10,
    },
    getFragmentProps: (props) => ({ data: props })
  },
);

export default ItemListQR;