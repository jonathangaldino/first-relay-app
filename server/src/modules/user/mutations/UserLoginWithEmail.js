import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLString, GraphQLNonNull } from 'graphql';

import UserModel from '../UserModel';
import { createToken } from '../../../common/auth';
import * as UserLoader from '../UserLoader';
import { UserType } from '../UserType';

export default mutationWithClientMutationId({
  name: 'UserLoginWithEmail',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  mutateAndGetPayload: async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email.trim().toLowerCase() });

    const errorMessage = 'Invalid credentials';

    if (!user) {
      throw new Error(errorMessage);
    }

    const isPasswordCorrect = user.comparePassword(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error(errorMessage);
    }

    return {
      token: createToken(user),
      id: user._id,
    };
  },

  outputFields: {
    token: {
      type: GraphQLString,
      resolve: ({ token }) => token,
    },
    me: {
      type: UserType,
      resolve: async ({ id }, _args, context) => UserLoader.load(context, id),
    },
  },
});
