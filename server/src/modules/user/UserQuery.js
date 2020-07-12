import { GraphQLNonNull } from 'graphql';

import { UserType } from './UserType';
import * as UserLoader from './UserLoader';

export const MeQuery = {
  type: new GraphQLNonNull(UserType),
  resolve: async (_root, _args, ctx) => UserLoader.load(ctx, ctx.user._id),
};
