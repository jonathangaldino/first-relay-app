import { GraphQLList, GraphQLNonNull } from 'graphql';
import { ItemType } from '../../graphql/nodes';
import Item from './ItemModel';

export const ListItemsQuery = {
  type: new GraphQLNonNull(GraphQLList(ItemType)),
  resolve: async (_root, _args, _ctx) => {
    return Item.find();
  },
};
