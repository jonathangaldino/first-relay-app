import { GraphQLObjectType } from 'graphql';

import ItemMutations from '../modules/item/mutations';
import UserMutations from '../modules/user/mutations';

const MutationType = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...UserMutations,
    ...ItemMutations,
  }),
});

export default MutationType;
