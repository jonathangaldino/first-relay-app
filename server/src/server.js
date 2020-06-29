import koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import './common/environment';
import { schema } from './graphql/schema';

const createServer = () => {
  const server = new koa();

  server.on('error', err => {
    console.log('Server error', err);
  })

  server.use(
    mount('/graphql',
    graphqlHTTP({
      schema,
      graphiql: true
    }))
  )

  return server;
};

export { createServer }
