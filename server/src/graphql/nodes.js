import { nodeDefinitions, fromGlobalId, globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { mongooseIDResolver } from '../common/mongooseIDResolver';

import ItemService from '../modules/item/ItemService';

export const { nodeInterface, nodeField } = nodeDefinitions(
  async globalId => {
    const { type, id } = fromGlobalId(globalId);
    console.log({ type, id, globalId });

    if (type === 'Item') {
      return ItemService.getItem(id);
    }

    return null;
  },
  obj => {
    console.log('aaa', obj);
    if (obj.type) return ItemType;

    return null;
  },
);

/** TODO: Find a way to not trigger dependecy cycle */

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
  }),
  interfaces: [nodeInterface],
});
