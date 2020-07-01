import { GraphQLNonNull, GraphQLString } from 'graphql';

// This is a nice way to export mongoose fields
// https://github.com/sibelius/relay-workshop

export const mongooseIDResolver = {
  _id: {
    type: GraphQLNonNull(GraphQLString),
    description: 'mongodb _id',
    resolve: ({ _id }) => _id.toString(),
  },
};

export const timestamps = {
  createdAt: {
    type: GraphQLString,
    resolve: obj => (obj.createdAt ? obj.createdAt.toISOString() : null),
  },
  updatedAt: {
    type: GraphQLString,
    resolve: obj => (obj.updatedAt ? obj.updatedAt.toISOString() : null),
  },
};
