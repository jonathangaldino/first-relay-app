import { GraphQLNonNull, GraphQLString } from 'graphql';

export const mongooseIDResolver = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
    description: 'mongoose _id',
    resolve: ({ _id }) => _id.toString(),
  },
};
