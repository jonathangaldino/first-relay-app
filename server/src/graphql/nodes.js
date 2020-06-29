import { nodeDefinitions, fromGlobalId, globalIdField } from 'graphql-relay';
import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';

import ItemService from '../modules/item/ItemService';

export const { nodeInterface, nodeField } = nodeDefinitions(
  async globalId => {
    const { type, id } = fromGlobalId(globalId);
    console.log({ type, id });

    if (type === 'Item') {
      return ItemService.getItem(id);
    }

    return null;
  },
  obj => {
    console.log('aaa');
    return obj.price ? ItemType : null;
  },
);

/** TODO: Find a way to not trigger dependecy cycle */

export const ItemType = new GraphQLObjectType({
  name: 'Item',
  description: 'Item data',
  fields: () => ({
    id: globalIdField(),
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
