import  { Variables } from 'react-relay';
import  { RequestNode } from 'relay-runtime';

import { getToken } from '../utils/token';
export const GRAPHQL_URL = 'http://localhost:4000/graphql';


const fetchQuery = async (request: RequestNode, variables: Variables) => {
  const body = JSON.stringify({
    name: request.name, // used by graphql mock on tests
    query: request.text, // GraphQL text from input
    variables,
  });
  const headers = {
    Accept: 'application/json',
    'Content-type': 'application/json',
    Authorization: getToken(),
  };

  const response = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers,
    body,
  });

  return await response.json();
};

export default fetchQuery;
