import { globalIdField } from 'graphql-relay';
import { GraphQLString, GraphQLInt, GraphQLObjectType } from 'graphql';

import { mongooseIDResolver, timestamps } from '../../common/mongooseResolvers';
import { nodeInterface } from '../node/definitions';

export const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'Item data',
  fields: () => ({
    id: globalIdField('Item'),
    ...mongooseIDResolver,
    name: {
      type: GraphQLString,
      resolve: item => item.name,
    },
    price: {
      type: GraphQLInt,
      resolve: item => item.price,
    },
    type: {
      type: GraphQLString,
      resolve: item => item.type,
    },
    ...timestamps,
  }),
  interfaces: () => [nodeInterface],
});
