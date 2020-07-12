import { GraphQLString } from 'graphql';

export const errorField = {
  error: {
    type: GraphQLString,
    resolve: ({ error }) => error,
  },
};

export const successField = {
  success: {
    type: GraphQLString,
    resolve: ({ success }) => success,
  },
};
