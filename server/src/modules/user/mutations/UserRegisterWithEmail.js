import { mutationWithClientMutationId } from 'graphql-relay';
import { GraphQLNonNull, GraphQLString } from 'graphql';

import UserModel from '../UserModel';
import { UserType } from '../UserType';
import { createToken } from '../../../common/auth';
import * as UserLoader from '../UserLoader';

export default mutationWithClientMutationId({
  name: 'UserRegisterWithEmail',
  inputFields: {
    email: {
      type: new GraphQLNonNull(GraphQLString),
    },
    password: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },

  mutateAndGetPayload: async ({ email, password }) => {
    const userExists =
      (await UserModel.countDocuments({
        email: email.trim().toLowerCase(),
      })) > 0;

    if (userExists) {
      throw new Error('Email already in use');
    }

    const user = await UserModel.create({
      email,
      password,
    });

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
      resolve: async ({ id }, _, ctx) => UserLoader.load(ctx, id),
    },
  },
});
