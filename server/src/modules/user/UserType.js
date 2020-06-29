import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { globalIdField } from 'graphql-relay';

import { mongooseIDResolver, timestamps } from '../../common/mongooseResolvers';
import { nodeInterface } from '../node/definitions';

export const UserType = new GraphQLObjectType({
  name: 'User',
  description: 'User data',
  fields: () => ({
    id: globalIdField('User'),
    ...mongooseIDResolver,
    email: {
      type: GraphQLNonNull(GraphQLString),
      resolve: user => user.email,
    },
    ...timestamps,
  }),
  interfaces: () => [nodeInterface],
});
