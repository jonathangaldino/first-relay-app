import { GraphQLObjectType } from 'graphql';

import { CreateItemMutation } from '../modules/item/ItemMutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    createItem: CreateItemMutation,
  }),
});

export default MutationType;
