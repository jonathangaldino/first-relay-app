import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';

import * as ItemLoader from './ItemLoader';
import { ItemType, ItemConnection } from './ItemType';

export const ListItemsQuery = {
  type: new GraphQLNonNull(ItemConnection.connectionType),
  args: {
    name: {
      type: GraphQLString,
    },
    ...connectionArgs,
  },
  resolve: async (_root, args, context) => ItemLoader.loadItems(context, args),
};

export const GetItemQuery = {
  type: new GraphQLNonNull(ItemType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_root, { id }, ctx) => ItemLoader.load(ctx, id),
};
