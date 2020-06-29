import { globalIdField } from 'graphql-relay';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
} from 'graphql';

import { mongooseIDResolver, timestamps } from '../../common/mongooseResolvers';
import { nodeInterface } from '../node/definitions';

export const ItemTypeEnumType = new GraphQLEnumType({
  name: 'ItemTypeEnum',
  values: {
    GUN: { value: 'GUN' },
    ARMOR: { value: 'ARMOR' },
    SKILL: { value: 'SKILL' },
  },
});

export const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'Item data',
  fields: () => ({
    id: globalIdField('Item'),
    ...mongooseIDResolver,
    name: {
      type: GraphQLNonNull(GraphQLString),
      resolve: item => item.name,
    },
    price: {
      type: GraphQLNonNull(GraphQLInt),
      resolve: item => item.price,
    },
    type: {
      type: GraphQLNonNull(ItemTypeEnumType),
      resolve: item => item.type,
    },
    ...timestamps,
  }),
  interfaces: () => [nodeInterface],
});
