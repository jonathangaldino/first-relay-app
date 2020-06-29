import { GraphQLObjectType } from 'graphql';

import ItemMutations from '../modules/item/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...ItemMutations,
  }),
});

export default MutationType;
