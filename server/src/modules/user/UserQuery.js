import { GraphQLNonNull, GraphQLList } from 'graphql';

import { UserType } from './UserType';
import UserModel from './UserModel';

export const MeQuery = {
  type: new GraphQLNonNull(UserType),
  resolve: async (_root, _args, { user }) => {
    return UserModel.findById(user._id);
  },
};
