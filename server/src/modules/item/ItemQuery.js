import { GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';
import { connectionArgs } from 'graphql-relay';
import {
  connectionFromMongoCursor,
  // eslint-disable-next-line
} from '@entria/graphql-mongoose-loader';

import ItemModel from './ItemModel';
import { ItemType, ItemConnection } from './ItemType';

export const ListItemsQuery = {
  type: new GraphQLNonNull(ItemConnection.connectionType),
  args: {
    name: {
      type: GraphQLString,
    },
    ...connectionArgs,
  },
  resolve: async (_root, args, context) => {
    let conditions;

    if (args.name) {
      conditions = {
        $text: { $search: args.name },
      };
    }

    return connectionFromMongoCursor({
      cursor: ItemModel.find(conditions).sort({ createdAt: -1 }),
      context,
      args,
      loader: (_, id) => ItemModel.findById(id),
    });
  },
};

export const GetItemQuery = {
  type: new GraphQLNonNull(ItemType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_root, { id }, _ctx) => {
    return ItemModel.findById(id);
  },
};
