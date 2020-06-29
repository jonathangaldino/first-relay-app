import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

import Item from '../ItemModel';
import { ItemType } from '../ItemType';

export default mutationWithClientMutationId({
  name: 'CreateItem',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ name, price, type }) => {
    const newItem = await Item.create({ name, price, type });

    return {
      itemId: newItem._id,
    };
  },
  outputFields: {
    item: {
      type: ItemType,
      resolve: async ({ itemId }) => {
        const item = await Item.findById(itemId);
        return item;
      },
    },
  },
});
