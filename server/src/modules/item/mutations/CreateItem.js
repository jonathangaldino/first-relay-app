import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString, GraphQLInt } from 'graphql';

import ItemModel from '../ItemModel';
import * as ItemLoader from '../ItemLoader';
import { ItemType } from '../ItemType';

export default mutationWithClientMutationId({
  name: 'CreateItem',
  inputFields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    price: { type: new GraphQLNonNull(GraphQLInt) },
    type: { type: new GraphQLNonNull(GraphQLString) },
  },
  mutateAndGetPayload: async ({ name, price, type }, ctx) => {
    // There is a better way to handle this using middlewares
    // Have to look around a way to pass a middleware
    // within this object that is being exported as default
    if (!ctx.user) {
      throw new Error('User not logged');
    }

    const newItem = await ItemModel.create({
      name,
      price,
      type,
      owner: ctx.user._id,
    });

    return {
      itemId: newItem._id,
    };
  },
  outputFields: {
    item: {
      type: ItemType,
      resolve: async ({ itemId }, _, ctx) => {
        return ItemLoader.load(ctx, itemId);
      },
    },
  },
});
