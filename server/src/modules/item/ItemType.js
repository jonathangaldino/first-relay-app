import { globalIdField, connectionDefinitions } from 'graphql-relay';
import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLEnumType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} from 'graphql';

import { mongooseIDResolver, timestamps } from '../../common/mongooseResolvers';
import { nodeInterface } from '../node/definitions';
import { UserType } from '../user/UserType';
import UserModel from '../user/UserModel';

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
    owner: {
      type: UserType,
      resolve: async (item, _, _context) => UserModel.findById(item.owner),
    },
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

export const ItemConnection = connectionDefinitions({
  name: 'Item',
  nodeType: ItemType,
});

// const ItemEdge = new GraphQLObjectType({
//   name: 'ItemEdge',
//   fields: () => ({
//     cursor: {
//       type: GraphQLString,
//       resolve(parent) {
//         console.log('ItemEdge cursor', parent);
//         return {
//           value: parent._id.toString(),
//         };
//       },
//     },
//     node: {
//       type: ItemType,
//       resolve(parent) {
//         console.log('ItemEdge Parent: ', parent);
//         return parent;
//       },
//     },
//   }),
// });

// export const PageInfo = new GraphQLObjectType({
//   name: 'PageInfo',
//   fields: {
//     hasNextPage: {
//       type: new GraphQLNonNull(GraphQLBoolean),
//     },
//     hasPreviousPage: {
//       type: new GraphQLNonNull(GraphQLBoolean),
//     },
//   },
// });

// export const ItemConnection = new GraphQLObjectType({
//   name: 'ItemConnection',
//   fields: () => ({
//     edges: {
//       type: new GraphQLList(ItemEdge),
//       resolve: parent => {
//         console.log('ItemConnection parent', parent);
//         return null;
//       },
//     },
//     pageInfo: {
//       type: new GraphQLNonNull(PageInfo),
//     },
//   }),
// });
