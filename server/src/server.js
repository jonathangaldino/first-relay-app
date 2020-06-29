import Koa from 'koa';
import mount from 'koa-mount';
import graphqlHTTP from 'koa-graphql';

import './common/environment';
import { schema } from './graphql/schema';
import { getUserFromToken } from './common/auth';

const serverSettings = async req => {
  const token = req.headers.authorization;
  const user = await getUserFromToken(token);

  return {
    graphiql: process.env.NODE_ENV !== 'production',
    schema,
    context: {
      user,
      req,
    },
  };
};

const graphqlServer = graphqlHTTP(serverSettings);

const createServer = () => {
  const server = new Koa();

  server.on('error', err => {
    console.log('Server error', err);
  });

  server.use(mount('/graphql', graphqlServer));

  return server;
};

export { createServer };
