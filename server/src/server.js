import { ApolloServer } from 'apollo-server';

import typeDefs from './graphql/typedefs';
import { resolvers } from './graphql/resolvers';

import './common/environment';

const createServer = () => {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
};

export { createServer }
