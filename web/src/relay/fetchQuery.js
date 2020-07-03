import  { Variables } from 'react-relay';
import  { RequestNode } from 'relay-runtime';

export const GRAPHQL_URL = 'http://localhost:4000/graphql';

const TOKEN_KEY = 'first-relay-app::token';

export function getToken() {
  // get token from cookie or session token instead
  return localStorage.getItem(TOKEN_KEY);
}

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
