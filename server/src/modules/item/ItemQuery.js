import { GraphQLList, GraphQLNonNull } from 'graphql';

import ItemModel from './ItemModel';
import { ItemType } from './ItemType';

export const ListItemsQuery = {
  type: new GraphQLNonNull(GraphQLList(ItemType)),
  resolve: async (_root, _args, _ctx) => {
    return ItemModel.find();
  },
};
