import { GraphQLList, GraphQLNonNull, GraphQLID, GraphQLString } from 'graphql';

import ItemModel from './ItemModel';
import { ItemType } from './ItemType';

export const ListItemsQuery = {
  type: new GraphQLNonNull(GraphQLList(ItemType)),
  args: {
    name: {
      type: GraphQLString,
    },
  },
  resolve: async (_root, { name }, _ctx) => {
    let filter;

    if (name) {
      filter = {
        $text: { $search: name },
      };
    }

    return ItemModel.find(filter || {});
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
